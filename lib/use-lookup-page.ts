/**
 * Hook for debounced page lookup with validation feedback
 */

'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { normalizeRoute, validateRoute, getValidationResult, type ValidationState } from './route-validation'

export interface LookupState {
  validationState: ValidationState
  isChecking: boolean
  isValid: boolean
  normalizedPath: string
  error?: string
  suggestion?: string
  pageFound: boolean
  pageData?: any
}

interface UseLookupPageOptions {
  debounceMs?: number
  onLookupStart?: () => void
  onLookupEnd?: () => void
}

export function useLookupPage(options: UseLookupPageOptions = {}) {
  const { debounceMs = 300, onLookupStart, onLookupEnd } = options

  const [input, setInput] = useState('')
  const [lookupState, setLookupState] = useState<LookupState>({
    validationState: 'empty',
    isChecking: false,
    isValid: false,
    normalizedPath: '',
    pageFound: false,
  })

  const debounceTimerRef = useRef<NodeJS.Timeout>()
  const abortControllerRef = useRef<AbortController>()

  const performLookup = useCallback(async (path: string) => {
    const result = getValidationResult(path)
    if (result.state === 'empty') {
      setLookupState({
        validationState: 'empty',
        isChecking: false,
        isValid: false,
        normalizedPath: '',
        pageFound: false,
      })
      onLookupEnd?.()
      return
    }

    if (result.state === 'invalid') {
      setLookupState({
        validationState: 'invalid',
        isChecking: false,
        isValid: false,
        normalizedPath: path,
        error: result.error,
        suggestion: result.suggestion,
        pageFound: false,
      })
      onLookupEnd?.()
      return
    }

    // Start checking
    onLookupStart?.()
    const checkingResult = getValidationResult(path, true)
    setLookupState({
      validationState: checkingResult.state,
      isValid: checkingResult.isValid,
      error: checkingResult.error,
      suggestion: checkingResult.suggestion,
      isChecking: true,
      pageFound: false,
      normalizedPath: path,
    })

    // Cancel previous request
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch(`/api/admin/find-page?route=${encodeURIComponent(path)}`, {
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        setLookupState({
          validationState: 'invalid',
          isChecking: false,
          isValid: false,
          normalizedPath: path,
          error: 'Lookup failed',
          pageFound: false,
        })
        return
      }

      const data = await response.json()

      if (data.found && data.page) {
        const res = getValidationResult(path, false, true, data.page.pageTitle, data.page.templateId)
        setLookupState({
          validationState: res.state,
          isValid: res.isValid,
          error: res.error,
          suggestion: res.suggestion,
          isChecking: false,
          pageFound: true,
          pageData: data.page,
          normalizedPath: path,
        })
      } else {
        // Valid path but not in registry
        const res = getValidationResult(path, false, false)
        setLookupState({
          validationState: res.state,
          isValid: res.isValid,
          error: res.error,
          suggestion: res.suggestion,
          isChecking: false,
          pageFound: false,
          normalizedPath: path,
        })
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setLookupState({
          validationState: 'invalid',
          isChecking: false,
          isValid: false,
          normalizedPath: path,
          error: 'Network error',
          pageFound: false,
        })
      }
    } finally {
      onLookupEnd?.()
    }
  }, [onLookupStart, onLookupEnd])

  const handleInputChange = useCallback((value: string) => {
    const normalized = normalizeRoute(value)
    setInput(value)

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (!normalized || normalized === '') {
      setLookupState({
        validationState: 'empty',
        isChecking: false,
        isValid: false,
        normalizedPath: '',
        pageFound: false,
      })
      return
    }

    // Set timer for debounced lookup
    debounceTimerRef.current = setTimeout(() => {
      void performLookup(normalized)
    }, debounceMs)
  }, [debounceMs, performLookup])

  const handleBlur = useCallback(() => {
    // If still debouncing, trigger immediately
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      const normalized = normalizeRoute(input)
      if (normalized) {
        void performLookup(normalized)
      }
    }
  }, [input, performLookup])

  const reset = useCallback(() => {
    setInput('')
    setLookupState({
      validationState: 'empty',
      isChecking: false,
      isValid: false,
      normalizedPath: '',
      pageFound: false,
    })
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      abortControllerRef.current?.abort()
    }
  }, [])

  return {
    // Input
    input,
    setInput: handleInputChange,

    // Lookup state
    ...lookupState,

    // Handlers
    handleBlur,
    reset,
  }
}
