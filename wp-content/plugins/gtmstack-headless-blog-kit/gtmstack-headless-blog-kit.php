<?php
/**
 * Plugin Name: GTMStack Headless Blog Kit
 * Description: Registers ACF article presentation fields, Gutenberg starter patterns, and an AnythingLLM payload importer for a headless WordPress + Next.js blog workflow.
 * Version: 0.3.0
 * Author: OpenAI
 * License: GPL-2.0-or-later
 */

if (!defined('ABSPATH')) {
	exit;
}

final class GTMStack_Headless_Blog_Kit {
	const VERSION = '0.3.0';
	const ACTIVATED_OPTION = 'gtmstack_hbk_just_activated';

	const FIELD_LAYOUT_TYPE = 'field_gtmstack_layout_type';
	const FIELD_HERO_KICKER = 'field_gtmstack_hero_kicker';
	const FIELD_DEK = 'field_gtmstack_dek';
	const FIELD_FEATURED_QUOTE = 'field_gtmstack_featured_quote';
	const FIELD_QUOTE_SOURCE = 'field_gtmstack_quote_source';
	const FIELD_CTA_HEADLINE = 'field_gtmstack_cta_headline';
	const FIELD_CTA_BODY = 'field_gtmstack_cta_body';
	const FIELD_CTA_BUTTON_LABEL = 'field_gtmstack_cta_button_label';
	const FIELD_CTA_BUTTON_URL = 'field_gtmstack_cta_button_url';
	const FIELD_AUTHOR_NOTE = 'field_gtmstack_author_note';

	const FIELD_SHOW_TAKEAWAYS = 'field_gtmstack_show_takeaways';
	const FIELD_TAKEAWAYS = 'field_gtmstack_takeaways';
	const FIELD_TAKEAWAY_ITEM = 'field_gtmstack_takeaway_item';
	const FIELD_CHECKLIST_TITLE = 'field_gtmstack_checklist_title';
	const FIELD_CHECKLIST_ITEMS = 'field_gtmstack_checklist_items';
	const FIELD_CHECKLIST_ITEM = 'field_gtmstack_checklist_item';

	const FIELD_KEY_IDEAS = 'field_gtmstack_key_ideas';
	const FIELD_KEY_IDEA_ITEM = 'field_gtmstack_key_idea_item';
	const FIELD_CLOSING_THESIS = 'field_gtmstack_closing_thesis';

	const FIELD_COMPARISON_SUMMARY = 'field_gtmstack_comparison_summary';
	const FIELD_OPTION_A_NAME = 'field_gtmstack_option_a_name';
	const FIELD_OPTION_B_NAME = 'field_gtmstack_option_b_name';
	const FIELD_OPTION_A_PROS = 'field_gtmstack_option_a_pros';
	const FIELD_OPTION_A_PRO_ITEM = 'field_gtmstack_option_a_pro_item';
	const FIELD_OPTION_A_CONS = 'field_gtmstack_option_a_cons';
	const FIELD_OPTION_A_CON_ITEM = 'field_gtmstack_option_a_con_item';
	const FIELD_OPTION_B_PROS = 'field_gtmstack_option_b_pros';
	const FIELD_OPTION_B_PRO_ITEM = 'field_gtmstack_option_b_pro_item';
	const FIELD_OPTION_B_CONS = 'field_gtmstack_option_b_cons';
	const FIELD_OPTION_B_CON_ITEM = 'field_gtmstack_option_b_con_item';
	const FIELD_RECOMMENDATION_HEADLINE = 'field_gtmstack_recommendation_headline';
	const FIELD_RECOMMENDATION_BODY = 'field_gtmstack_recommendation_body';

	const FIELD_FRAMEWORK_NAME = 'field_gtmstack_framework_name';
	const FIELD_FRAMEWORK_INTRO = 'field_gtmstack_framework_intro';
	const FIELD_FRAMEWORK_PILLARS = 'field_gtmstack_framework_pillars';
	const FIELD_FRAMEWORK_PILLAR_ITEM = 'field_gtmstack_framework_pillar_item';
	const FIELD_IMPLEMENTATION_CHECKLIST = 'field_gtmstack_implementation_checklist';
	const FIELD_IMPLEMENTATION_CHECKLIST_ITEM = 'field_gtmstack_implementation_checklist_item';
	const FIELD_WHEN_TO_USE = 'field_gtmstack_when_to_use';
	const FIELD_WHEN_NOT_TO_USE = 'field_gtmstack_when_not_to_use';

	const FIELD_CLIENT_NAME = 'field_gtmstack_client_name';
	const FIELD_CLIENT_INDUSTRY = 'field_gtmstack_client_industry';
	const FIELD_CHALLENGE_SUMMARY = 'field_gtmstack_challenge_summary';
	const FIELD_APPROACH_SUMMARY = 'field_gtmstack_approach_summary';
	const FIELD_SOLUTION_SUMMARY = 'field_gtmstack_solution_summary';
	const FIELD_RESULTS_METRICS = 'field_gtmstack_results_metrics';
	const FIELD_RESULT_METRIC_ITEM = 'field_gtmstack_result_metric_item';
	const FIELD_LESSONS_LEARNED = 'field_gtmstack_lessons_learned';
	const FIELD_LESSON_LEARNED_ITEM = 'field_gtmstack_lesson_learned_item';

	const FIELD_KEY_FINDINGS = 'field_gtmstack_key_findings';
	const FIELD_KEY_FINDING_ITEM = 'field_gtmstack_key_finding_item';
	const FIELD_IMPLICATIONS = 'field_gtmstack_implications';
	const FIELD_RECOMMENDED_ACTIONS = 'field_gtmstack_recommended_actions';
	const FIELD_RECOMMENDED_ACTION_ITEM = 'field_gtmstack_recommended_action_item';
	const FIELD_SOURCE_NOTE = 'field_gtmstack_source_note';

	const FIELD_GUIDE_KEY_POINTS = 'field_gtmstack_guide_key_points';
	const FIELD_GUIDE_KEY_POINT_ITEM = 'field_gtmstack_guide_key_point_item';
	const FIELD_GUIDE_STEPS = 'field_gtmstack_guide_steps';
	const FIELD_GUIDE_STEP_ITEM = 'field_gtmstack_guide_step_item';
	const FIELD_GUIDE_SUMMARY = 'field_gtmstack_guide_summary';

	public static function init() {
		register_activation_hook(__FILE__, [__CLASS__, 'activate']);
		add_action('admin_notices', [__CLASS__, 'acf_missing_notice']);
		add_action('admin_notices', [__CLASS__, 'activation_notice']);
		add_action('acf/init', [__CLASS__, 'register_acf_field_groups']);
		add_action('init', [__CLASS__, 'register_pattern_category']);
		add_action('init', [__CLASS__, 'register_block_patterns']);
		add_action('admin_menu', [__CLASS__, 'register_import_page']);
		add_action('admin_post_gtmstack_import_anythingllm_payload', [__CLASS__, 'handle_import_request']);
	}

	public static function activate() {
		if (!term_exists('B2B Strategy', 'category')) {
			wp_insert_term('B2B Strategy', 'category', [
				'slug' => 'b2b-strategy',
			]);
		}

		add_option(self::ACTIVATED_OPTION, 1);
	}

	public static function activation_notice() {
		if (!current_user_can('manage_options')) {
			return;
		}
		if (!get_option(self::ACTIVATED_OPTION)) {
			return;
		}
		delete_option(self::ACTIVATED_OPTION);
		echo '<div class="notice notice-success is-dismissible"><p><strong>GTMStack Headless Blog Kit</strong> activated. Shared article fields, layout-specific ACF groups, editor pattern, and importer are now available under Tools.</p></div>';
	}

	public static function acf_missing_notice() {
		if (!current_user_can('manage_options')) {
			return;
		}
		if (function_exists('acf_add_local_field_group')) {
			return;
		}
		echo '<div class="notice notice-warning"><p><strong>GTMStack Headless Blog Kit:</strong> ACF Pro is not active. Activate ACF Pro to load the article presentation fields and importer field mapping.</p></div>';
	}

	public static function register_import_page() {
		add_management_page('AnythingLLM Importer', 'AnythingLLM Importer', 'edit_posts', 'gtmstack-anythingllm-importer', [__CLASS__, 'render_import_page']);
	}

	public static function render_import_page() {
		if (!current_user_can('edit_posts')) {
			return;
		}

		$created_post_id = isset($_GET['created_post_id']) ? absint($_GET['created_post_id']) : 0;
		$error = isset($_GET['gtmstack_error']) ? sanitize_text_field(wp_unslash($_GET['gtmstack_error'])) : '';
		?>
		<div class="wrap">
			<h1>AnythingLLM Importer</h1>
			<p>Paste the full structured AnythingLLM payload below. The importer will create a draft post and populate the shared and layout-specific ACF presentation fields automatically.</p>
			<?php if ($created_post_id) : ?>
				<div class="notice notice-success is-dismissible"><p>Draft created successfully. <a href="<?php echo esc_url(get_edit_post_link($created_post_id)); ?>">Open draft</a> | <a href="<?php echo esc_url(get_permalink($created_post_id)); ?>">View post</a></p></div>
			<?php endif; ?>
			<?php if ($error) : ?>
				<div class="notice notice-error"><p><?php echo esc_html($error); ?></p></div>
			<?php endif; ?>
			<form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
				<?php wp_nonce_field('gtmstack_import_anythingllm_payload', 'gtmstack_import_nonce'); ?>
				<input type="hidden" name="action" value="gtmstack_import_anythingllm_payload" />
				<table class="form-table" role="presentation"><tbody>
					<tr>
						<th scope="row"><label for="payload">AnythingLLM Payload</label></th>
						<td>
							<textarea name="payload" id="payload" rows="28" style="width:100%;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;" placeholder="Paste the full output here, including WP_TITLE:, ACF_*, and GUTENBERG_BODY:"></textarea>
							<p class="description">The importer understands shared labels like WP_TITLE and ACF_DEK plus layout-specific labels such as ACF_KEY_IDEAS, ACF_FRAMEWORK_PILLARS, and ACF_RESULTS_METRICS.</p>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="post_status">Post Status</label></th>
						<td><select name="post_status" id="post_status"><option value="draft" selected>Draft</option><option value="pending">Pending Review</option></select></td>
					</tr>
				</tbody></table>
				<?php submit_button('Import Payload'); ?>
			</form>
		</div>
		<?php
	}
	public static function handle_import_request() {
		if (!current_user_can('edit_posts')) {
			wp_die('You do not have permission to import posts.');
		}
		check_admin_referer('gtmstack_import_anythingllm_payload', 'gtmstack_import_nonce');

		$payload = isset($_POST['payload']) ? wp_unslash($_POST['payload']) : '';
		$post_status = isset($_POST['post_status']) ? sanitize_key(wp_unslash($_POST['post_status'])) : 'draft';
		if (!$payload) {
			self::redirect_with_error('No payload was provided.');
		}

		$parsed = self::parse_payload($payload);
		if (empty($parsed['wp_title'])) {
			self::redirect_with_error('Could not find WP_TITLE in the payload.');
		}

		$post_id = wp_insert_post([
			'post_type' => 'post',
			'post_status' => in_array($post_status, ['draft', 'pending'], true) ? $post_status : 'draft',
			'post_title' => $parsed['wp_title'],
			'post_excerpt' => $parsed['wp_excerpt'],
			'post_name' => $parsed['wp_slug'],
			'post_content' => $parsed['gutenberg_body'],
		], true);

		if (is_wp_error($post_id)) {
			self::redirect_with_error('Post creation failed: ' . $post_id->get_error_message());
		}

		update_post_meta($post_id, '_gtmstack_anythingllm_payload', $payload);

		if (!empty($parsed['wp_category'])) {
			$category_id = self::get_or_create_term_id($parsed['wp_category'], 'category');
			if ($category_id) {
				wp_set_post_terms($post_id, [$category_id], 'category', false);
			}
		}

		if (!empty($parsed['wp_tags'])) {
			$tag_ids = [];
			foreach ($parsed['wp_tags'] as $tag_name) {
				$tag_id = self::get_or_create_term_id($tag_name, 'post_tag');
				if ($tag_id) {
					$tag_ids[] = $tag_id;
				}
			}
			if ($tag_ids) {
				wp_set_post_terms($post_id, $tag_ids, 'post_tag', false);
			}
		}

		if (function_exists('update_field')) {
			update_field(self::FIELD_LAYOUT_TYPE, $parsed['acf_layout_type'] ?: 'how-to', $post_id);
			update_field(self::FIELD_HERO_KICKER, $parsed['acf_hero_kicker'], $post_id);
			update_field(self::FIELD_DEK, $parsed['acf_dek'], $post_id);
			update_field(self::FIELD_FEATURED_QUOTE, $parsed['acf_featured_quote'], $post_id);
			update_field(self::FIELD_QUOTE_SOURCE, $parsed['acf_quote_source'], $post_id);
			update_field(self::FIELD_CTA_HEADLINE, $parsed['acf_cta_headline'], $post_id);
			update_field(self::FIELD_CTA_BODY, $parsed['acf_cta_body'], $post_id);
			update_field(self::FIELD_CTA_BUTTON_LABEL, $parsed['acf_cta_button_label'], $post_id);
			update_field(self::FIELD_CTA_BUTTON_URL, $parsed['acf_cta_button_url'], $post_id);
			update_field(self::FIELD_AUTHOR_NOTE, $parsed['acf_author_note'], $post_id);
			update_field(self::FIELD_SHOW_TAKEAWAYS, !empty($parsed['acf_takeaways']), $post_id);
			update_field(self::FIELD_TAKEAWAYS, self::map_repeater_values(self::FIELD_TAKEAWAY_ITEM, $parsed['acf_takeaways']), $post_id);
			update_field(self::FIELD_CHECKLIST_TITLE, $parsed['acf_checklist_title'], $post_id);
			update_field(self::FIELD_CHECKLIST_ITEMS, self::map_repeater_values(self::FIELD_CHECKLIST_ITEM, $parsed['acf_checklist_items']), $post_id);
			update_field(self::FIELD_KEY_IDEAS, self::map_repeater_values(self::FIELD_KEY_IDEA_ITEM, $parsed['acf_key_ideas']), $post_id);
			update_field(self::FIELD_CLOSING_THESIS, $parsed['acf_closing_thesis'], $post_id);
			update_field(self::FIELD_COMPARISON_SUMMARY, $parsed['acf_comparison_summary'], $post_id);
			update_field(self::FIELD_OPTION_A_NAME, $parsed['acf_option_a_name'], $post_id);
			update_field(self::FIELD_OPTION_B_NAME, $parsed['acf_option_b_name'], $post_id);
			update_field(self::FIELD_OPTION_A_PROS, self::map_repeater_values(self::FIELD_OPTION_A_PRO_ITEM, $parsed['acf_option_a_pros']), $post_id);
			update_field(self::FIELD_OPTION_A_CONS, self::map_repeater_values(self::FIELD_OPTION_A_CON_ITEM, $parsed['acf_option_a_cons']), $post_id);
			update_field(self::FIELD_OPTION_B_PROS, self::map_repeater_values(self::FIELD_OPTION_B_PRO_ITEM, $parsed['acf_option_b_pros']), $post_id);
			update_field(self::FIELD_OPTION_B_CONS, self::map_repeater_values(self::FIELD_OPTION_B_CON_ITEM, $parsed['acf_option_b_cons']), $post_id);
			update_field(self::FIELD_RECOMMENDATION_HEADLINE, $parsed['acf_recommendation_headline'], $post_id);
			update_field(self::FIELD_RECOMMENDATION_BODY, $parsed['acf_recommendation_body'], $post_id);
			update_field(self::FIELD_FRAMEWORK_NAME, $parsed['acf_framework_name'], $post_id);
			update_field(self::FIELD_FRAMEWORK_INTRO, $parsed['acf_framework_intro'], $post_id);
			update_field(self::FIELD_FRAMEWORK_PILLARS, self::map_repeater_values(self::FIELD_FRAMEWORK_PILLAR_ITEM, $parsed['acf_framework_pillars']), $post_id);
			update_field(self::FIELD_IMPLEMENTATION_CHECKLIST, self::map_repeater_values(self::FIELD_IMPLEMENTATION_CHECKLIST_ITEM, $parsed['acf_implementation_checklist']), $post_id);
			update_field(self::FIELD_WHEN_TO_USE, $parsed['acf_when_to_use'], $post_id);
			update_field(self::FIELD_WHEN_NOT_TO_USE, $parsed['acf_when_not_to_use'], $post_id);
			update_field(self::FIELD_CLIENT_NAME, $parsed['acf_client_name'], $post_id);
			update_field(self::FIELD_CLIENT_INDUSTRY, $parsed['acf_client_industry'], $post_id);
			update_field(self::FIELD_CHALLENGE_SUMMARY, $parsed['acf_challenge_summary'], $post_id);
			update_field(self::FIELD_APPROACH_SUMMARY, $parsed['acf_approach_summary'], $post_id);
			update_field(self::FIELD_SOLUTION_SUMMARY, $parsed['acf_solution_summary'], $post_id);
			update_field(self::FIELD_RESULTS_METRICS, self::map_repeater_values(self::FIELD_RESULT_METRIC_ITEM, $parsed['acf_results_metrics']), $post_id);
			update_field(self::FIELD_LESSONS_LEARNED, self::map_repeater_values(self::FIELD_LESSON_LEARNED_ITEM, $parsed['acf_lessons_learned']), $post_id);
			update_field(self::FIELD_KEY_FINDINGS, self::map_repeater_values(self::FIELD_KEY_FINDING_ITEM, $parsed['acf_key_findings']), $post_id);
			update_field(self::FIELD_IMPLICATIONS, $parsed['acf_implications'], $post_id);
			update_field(self::FIELD_RECOMMENDED_ACTIONS, self::map_repeater_values(self::FIELD_RECOMMENDED_ACTION_ITEM, $parsed['acf_recommended_actions']), $post_id);
			update_field(self::FIELD_SOURCE_NOTE, $parsed['acf_source_note'], $post_id);
			update_field(self::FIELD_GUIDE_KEY_POINTS, self::map_repeater_values(self::FIELD_GUIDE_KEY_POINT_ITEM, $parsed['acf_guide_key_points']), $post_id);
			update_field(self::FIELD_GUIDE_STEPS, self::map_repeater_values(self::FIELD_GUIDE_STEP_ITEM, $parsed['acf_guide_steps']), $post_id);
			update_field(self::FIELD_GUIDE_SUMMARY, $parsed['acf_guide_summary'], $post_id);
		}

		wp_safe_redirect(add_query_arg(['page' => 'gtmstack-anythingllm-importer', 'created_post_id' => $post_id], admin_url('tools.php')));
		exit;
	}

	private static function redirect_with_error($message) {
		wp_safe_redirect(add_query_arg(['page' => 'gtmstack-anythingllm-importer', 'gtmstack_error' => rawurlencode($message)], admin_url('tools.php')));
		exit;
	}

	private static function get_or_create_term_id($term_name, $taxonomy) {
		$term_name = trim((string) $term_name);
		if ($term_name === '') {
			return 0;
		}
		$existing = term_exists($term_name, $taxonomy);
		if (is_array($existing) && !empty($existing['term_id'])) {
			return (int) $existing['term_id'];
		}
		if (is_int($existing)) {
			return $existing;
		}
		$created = wp_insert_term($term_name, $taxonomy);
		if (is_wp_error($created)) {
			return 0;
		}
		return !empty($created['term_id']) ? (int) $created['term_id'] : 0;
	}

	private static function parse_payload($payload) {
		$payload = str_replace(["\r\n", "\r"], "\n", trim((string) $payload));
		$payload = preg_replace('/^##\s*/m', '', $payload);
		return [
			'wp_title' => self::extract_single_line_field($payload, 'WP_TITLE'),
			'wp_excerpt' => self::extract_single_line_field($payload, 'WP_EXCERPT'),
			'wp_slug' => sanitize_title(self::extract_single_line_field($payload, 'WP_SLUG')),
			'wp_category' => self::extract_single_line_field($payload, 'WP_CATEGORY'),
			'wp_tags' => self::parse_csv_list(self::extract_single_line_field($payload, 'WP_TAGS')),
			'acf_layout_type' => self::extract_single_line_field($payload, 'ACF_LAYOUT_TYPE'),
			'acf_hero_kicker' => self::extract_single_line_field($payload, 'ACF_HERO_KICKER'),
			'acf_dek' => self::extract_single_line_field($payload, 'ACF_DEK'),
			'acf_featured_quote' => self::cleanup_quote(self::extract_single_line_field($payload, 'ACF_FEATURED_QUOTE')),
			'acf_quote_source' => self::extract_single_line_field($payload, 'ACF_QUOTE_SOURCE'),
			'acf_cta_headline' => self::extract_single_line_field($payload, 'ACF_CTA_HEADLINE'),
			'acf_cta_body' => self::extract_block_field($payload, 'ACF_CTA_BODY'),
			'acf_cta_button_label' => self::extract_single_line_field($payload, 'ACF_CTA_BUTTON_LABEL'),
			'acf_cta_button_url' => self::extract_single_line_field($payload, 'ACF_CTA_BUTTON_URL'),
			'acf_author_note' => self::extract_block_field($payload, 'ACF_AUTHOR_NOTE'),
			'acf_takeaways' => self::parse_list_block(self::extract_block_field($payload, 'ACF_TAKEAWAYS')),
			'acf_checklist_title' => self::extract_single_line_field($payload, 'ACF_CHECKLIST_TITLE'),
			'acf_checklist_items' => self::parse_list_block(self::extract_block_field($payload, 'ACF_CHECKLIST_ITEMS')),
			'acf_key_ideas' => self::parse_list_block(self::extract_block_field($payload, 'ACF_KEY_IDEAS')),
			'acf_closing_thesis' => self::extract_block_field($payload, 'ACF_CLOSING_THESIS'),
			'acf_comparison_summary' => self::extract_block_field($payload, 'ACF_COMPARISON_SUMMARY'),
			'acf_option_a_name' => self::extract_single_line_field($payload, 'ACF_OPTION_A_NAME'),
			'acf_option_b_name' => self::extract_single_line_field($payload, 'ACF_OPTION_B_NAME'),
			'acf_option_a_pros' => self::parse_list_block(self::extract_block_field($payload, 'ACF_OPTION_A_PROS')),
			'acf_option_a_cons' => self::parse_list_block(self::extract_block_field($payload, 'ACF_OPTION_A_CONS')),
			'acf_option_b_pros' => self::parse_list_block(self::extract_block_field($payload, 'ACF_OPTION_B_PROS')),
			'acf_option_b_cons' => self::parse_list_block(self::extract_block_field($payload, 'ACF_OPTION_B_CONS')),
			'acf_recommendation_headline' => self::extract_single_line_field($payload, 'ACF_RECOMMENDATION_HEADLINE'),
			'acf_recommendation_body' => self::extract_block_field($payload, 'ACF_RECOMMENDATION_BODY'),
			'acf_framework_name' => self::extract_single_line_field($payload, 'ACF_FRAMEWORK_NAME'),
			'acf_framework_intro' => self::extract_block_field($payload, 'ACF_FRAMEWORK_INTRO'),
			'acf_framework_pillars' => self::parse_list_block(self::extract_block_field($payload, 'ACF_FRAMEWORK_PILLARS')),
			'acf_implementation_checklist' => self::parse_list_block(self::extract_block_field($payload, 'ACF_IMPLEMENTATION_CHECKLIST')),
			'acf_when_to_use' => self::extract_block_field($payload, 'ACF_WHEN_TO_USE'),
			'acf_when_not_to_use' => self::extract_block_field($payload, 'ACF_WHEN_NOT_TO_USE'),
			'acf_client_name' => self::extract_single_line_field($payload, 'ACF_CLIENT_NAME'),
			'acf_client_industry' => self::extract_single_line_field($payload, 'ACF_CLIENT_INDUSTRY'),
			'acf_challenge_summary' => self::extract_block_field($payload, 'ACF_CHALLENGE_SUMMARY'),
			'acf_approach_summary' => self::extract_block_field($payload, 'ACF_APPROACH_SUMMARY'),
			'acf_solution_summary' => self::extract_block_field($payload, 'ACF_SOLUTION_SUMMARY'),
			'acf_results_metrics' => self::parse_list_block(self::extract_block_field($payload, 'ACF_RESULTS_METRICS')),
			'acf_lessons_learned' => self::parse_list_block(self::extract_block_field($payload, 'ACF_LESSONS_LEARNED')),
			'acf_key_findings' => self::parse_list_block(self::extract_block_field($payload, 'ACF_KEY_FINDINGS')),
			'acf_implications' => self::extract_block_field($payload, 'ACF_IMPLICATIONS'),
			'acf_recommended_actions' => self::parse_list_block(self::extract_block_field($payload, 'ACF_RECOMMENDED_ACTIONS')),
			'acf_source_note' => self::extract_block_field($payload, 'ACF_SOURCE_NOTE'),
			'acf_guide_key_points' => self::parse_list_block(self::extract_block_field($payload, 'ACF_GUIDE_KEY_POINTS')),
			'acf_guide_steps' => self::parse_list_block(self::extract_block_field($payload, 'ACF_GUIDE_STEPS')),
			'acf_guide_summary' => self::extract_block_field($payload, 'ACF_GUIDE_SUMMARY'),
			'gutenberg_body' => self::extract_gutenberg_body($payload),
		];
	}

	private static function extract_single_line_field($payload, $label) {
		if (preg_match('/^' . preg_quote($label, '/') . ':\s*(.+)$/mi', $payload, $matches)) {
			return trim($matches[1]);
		}
		return '';
	}

	private static function extract_block_field($payload, $label) {
		$pattern = '/^' . preg_quote($label, '/') . ':\s*(.*?)' . '(?=^\s*[A-Z0-9_]+:\s*|\z)/ms';
		if (preg_match($pattern, $payload, $matches)) {
			return trim($matches[1]);
		}
		return '';
	}

	private static function extract_gutenberg_body($payload) {
		if (preg_match('/^GUTENBERG_BODY:\s*(.*)\z/ms', $payload, $matches)) {
			return trim($matches[1]);
		}
		return '';
	}

	private static function parse_csv_list($value) {
		$parts = array_map('trim', explode(',', (string) $value));
		return array_values(array_filter($parts));
	}

	private static function parse_list_block($block) {
		$lines = preg_split('/\n+/', trim((string) $block));
		$items = [];
		foreach ($lines as $line) {
			$line = trim($line);
			if ($line === '') {
				continue;
			}
			$line = preg_replace('/^[-*]\s+/', '', $line);
			$line = preg_replace('/^\d+\.\s+/', '', $line);
			$line = trim($line);
			if ($line !== '') {
				$items[] = $line;
			}
		}
		return $items;
	}

	private static function cleanup_quote($quote) {
		$quote = trim((string) $quote);
		if (preg_match('/^["\x{201C}](.*)["\x{201D}]$/u', $quote, $matches)) {
			return trim($matches[1]);
		}
		return $quote;
	}

	private static function map_repeater_values($sub_field_key, $items) {
		$rows = [];
		foreach ((array) $items as $item) {
			$item = trim((string) $item);
			if ($item === '') {
				continue;
			}
			$rows[] = [$sub_field_key => $item];
		}
		return $rows;
	}
	private static function post_location_rule() {
		return [[[ 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ]]];
	}

	private static function layout_conditional_logic($layout_value) {
		return [[[ 'field' => self::FIELD_LAYOUT_TYPE, 'operator' => '==', 'value' => $layout_value ]]];
	}

	private static function make_repeater_sub_field($key, $label, $name = 'item') {
		return ['key' => $key, 'label' => $label, 'name' => $name, 'type' => 'text'];
	}

	private static function make_simple_repeater($key, $label, $name, $sub_field_key, $button_label, $conditional_logic) {
		return [
			'key' => $key,
			'label' => $label,
			'name' => $name,
			'type' => 'repeater',
			'layout' => 'table',
			'button_label' => $button_label,
			'conditional_logic' => $conditional_logic,
			'sub_fields' => [self::make_repeater_sub_field($sub_field_key, 'Item')],
		];
	}

	public static function register_acf_field_groups() {
		if (!function_exists('acf_add_local_field_group')) {
			return;
		}
		self::register_shared_field_group();
		self::register_how_to_field_group();
		self::register_insight_field_group();
		self::register_comparison_field_group();
		self::register_framework_field_group();
		self::register_case_study_field_group();
		self::register_research_field_group();
		self::register_guide_field_group();
	}

	private static function register_shared_field_group() {
		acf_add_local_field_group([
			'key' => 'group_gtmstack_article_presentation_shared',
			'title' => 'Article Presentation',
			'fields' => [
				['key' => self::FIELD_LAYOUT_TYPE, 'label' => 'Layout Type', 'name' => 'layout_type', 'type' => 'select', 'choices' => ['how-to' => 'How-To / Playbook', 'insight' => 'Insight / Thought Leadership', 'comparison' => 'Comparison / Versus', 'framework' => 'Framework / Checklist', 'case-study' => 'Case Study Article', 'research' => 'Research / Trend Brief', 'guide' => 'Evergreen Guide'], 'default_value' => 'how-to', 'return_format' => 'value', 'ui' => 1],
				['key' => self::FIELD_HERO_KICKER, 'label' => 'Hero Kicker', 'name' => 'hero_kicker', 'type' => 'text'],
				['key' => self::FIELD_DEK, 'label' => 'Dek', 'name' => 'dek', 'type' => 'textarea', 'rows' => 3],
				['key' => self::FIELD_FEATURED_QUOTE, 'label' => 'Featured Quote', 'name' => 'featured_quote', 'type' => 'textarea', 'rows' => 3],
				['key' => self::FIELD_QUOTE_SOURCE, 'label' => 'Quote Source', 'name' => 'quote_source', 'type' => 'text'],
				['key' => self::FIELD_CTA_HEADLINE, 'label' => 'CTA Headline', 'name' => 'cta_headline', 'type' => 'text'],
				['key' => self::FIELD_CTA_BODY, 'label' => 'CTA Body', 'name' => 'cta_body', 'type' => 'textarea', 'rows' => 3],
				['key' => self::FIELD_CTA_BUTTON_LABEL, 'label' => 'CTA Button Label', 'name' => 'cta_button_label', 'type' => 'text'],
				['key' => self::FIELD_CTA_BUTTON_URL, 'label' => 'CTA Button URL', 'name' => 'cta_button_url', 'type' => 'text'],
				['key' => self::FIELD_AUTHOR_NOTE, 'label' => 'Author Note', 'name' => 'author_note', 'type' => 'textarea', 'rows' => 3],
			],
			'location' => self::post_location_rule(),
			'position' => 'acf_after_title',
			'style' => 'default',
			'label_placement' => 'top',
			'instruction_placement' => 'label',
			'active' => true,
			'show_in_rest' => 1,
		]);
	}

	private static function register_how_to_field_group() {
		$logic = self::layout_conditional_logic('how-to');
		acf_add_local_field_group(['key' => 'group_gtmstack_layout_how_to', 'title' => 'How-To Layout', 'fields' => [
			['key' => self::FIELD_SHOW_TAKEAWAYS, 'label' => 'Show Takeaways', 'name' => 'show_takeaways', 'type' => 'true_false', 'ui' => 1, 'default_value' => 1, 'conditional_logic' => $logic],
			self::make_simple_repeater(self::FIELD_TAKEAWAYS, 'Takeaways', 'takeaways', self::FIELD_TAKEAWAY_ITEM, 'Add Takeaway', $logic),
			['key' => self::FIELD_CHECKLIST_TITLE, 'label' => 'Checklist Title', 'name' => 'checklist_title', 'type' => 'text', 'conditional_logic' => $logic],
			self::make_simple_repeater(self::FIELD_CHECKLIST_ITEMS, 'Checklist Items', 'checklist_items', self::FIELD_CHECKLIST_ITEM, 'Add Checklist Item', $logic),
		], 'location' => self::post_location_rule(), 'active' => true, 'show_in_rest' => 1]);
	}

	private static function register_insight_field_group() {
		$logic = self::layout_conditional_logic('insight');
		acf_add_local_field_group(['key' => 'group_gtmstack_layout_insight', 'title' => 'Insight Layout', 'fields' => [
			self::make_simple_repeater(self::FIELD_KEY_IDEAS, 'Key Ideas', 'key_ideas', self::FIELD_KEY_IDEA_ITEM, 'Add Key Idea', $logic),
			['key' => self::FIELD_CLOSING_THESIS, 'label' => 'Closing Thesis', 'name' => 'closing_thesis', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
		], 'location' => self::post_location_rule(), 'active' => true, 'show_in_rest' => 1]);
	}

	private static function register_comparison_field_group() {
		$logic = self::layout_conditional_logic('comparison');
		acf_add_local_field_group(['key' => 'group_gtmstack_layout_comparison', 'title' => 'Comparison Layout', 'fields' => [
			['key' => self::FIELD_COMPARISON_SUMMARY, 'label' => 'Comparison Summary', 'name' => 'comparison_summary', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
			['key' => self::FIELD_OPTION_A_NAME, 'label' => 'Option A Name', 'name' => 'option_a_name', 'type' => 'text', 'conditional_logic' => $logic],
			['key' => self::FIELD_OPTION_B_NAME, 'label' => 'Option B Name', 'name' => 'option_b_name', 'type' => 'text', 'conditional_logic' => $logic],
			self::make_simple_repeater(self::FIELD_OPTION_A_PROS, 'Option A Pros', 'option_a_pros', self::FIELD_OPTION_A_PRO_ITEM, 'Add Option A Pro', $logic),
			self::make_simple_repeater(self::FIELD_OPTION_A_CONS, 'Option A Cons', 'option_a_cons', self::FIELD_OPTION_A_CON_ITEM, 'Add Option A Con', $logic),
			self::make_simple_repeater(self::FIELD_OPTION_B_PROS, 'Option B Pros', 'option_b_pros', self::FIELD_OPTION_B_PRO_ITEM, 'Add Option B Pro', $logic),
			self::make_simple_repeater(self::FIELD_OPTION_B_CONS, 'Option B Cons', 'option_b_cons', self::FIELD_OPTION_B_CON_ITEM, 'Add Option B Con', $logic),
			['key' => self::FIELD_RECOMMENDATION_HEADLINE, 'label' => 'Recommendation Headline', 'name' => 'recommendation_headline', 'type' => 'text', 'conditional_logic' => $logic],
			['key' => self::FIELD_RECOMMENDATION_BODY, 'label' => 'Recommendation Body', 'name' => 'recommendation_body', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
		], 'location' => self::post_location_rule(), 'active' => true, 'show_in_rest' => 1]);
	}

	private static function register_framework_field_group() {
		$logic = self::layout_conditional_logic('framework');
		acf_add_local_field_group(['key' => 'group_gtmstack_layout_framework', 'title' => 'Framework Layout', 'fields' => [
			['key' => self::FIELD_FRAMEWORK_NAME, 'label' => 'Framework Name', 'name' => 'framework_name', 'type' => 'text', 'conditional_logic' => $logic],
			['key' => self::FIELD_FRAMEWORK_INTRO, 'label' => 'Framework Intro', 'name' => 'framework_intro', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
			self::make_simple_repeater(self::FIELD_FRAMEWORK_PILLARS, 'Framework Pillars', 'framework_pillars', self::FIELD_FRAMEWORK_PILLAR_ITEM, 'Add Pillar', $logic),
			self::make_simple_repeater(self::FIELD_IMPLEMENTATION_CHECKLIST, 'Implementation Checklist', 'implementation_checklist', self::FIELD_IMPLEMENTATION_CHECKLIST_ITEM, 'Add Checklist Item', $logic),
			['key' => self::FIELD_WHEN_TO_USE, 'label' => 'When To Use', 'name' => 'when_to_use', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
			['key' => self::FIELD_WHEN_NOT_TO_USE, 'label' => 'When Not To Use', 'name' => 'when_not_to_use', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
		], 'location' => self::post_location_rule(), 'active' => true, 'show_in_rest' => 1]);
	}
	private static function register_case_study_field_group() {
		$logic = self::layout_conditional_logic('case-study');
		acf_add_local_field_group(['key' => 'group_gtmstack_layout_case_study', 'title' => 'Case Study Layout', 'fields' => [
			['key' => self::FIELD_CLIENT_NAME, 'label' => 'Client Name', 'name' => 'client_name', 'type' => 'text', 'conditional_logic' => $logic],
			['key' => self::FIELD_CLIENT_INDUSTRY, 'label' => 'Client Industry', 'name' => 'client_industry', 'type' => 'text', 'conditional_logic' => $logic],
			['key' => self::FIELD_CHALLENGE_SUMMARY, 'label' => 'Challenge Summary', 'name' => 'challenge_summary', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
			['key' => self::FIELD_APPROACH_SUMMARY, 'label' => 'Approach Summary', 'name' => 'approach_summary', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
			['key' => self::FIELD_SOLUTION_SUMMARY, 'label' => 'Solution Summary', 'name' => 'solution_summary', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
			self::make_simple_repeater(self::FIELD_RESULTS_METRICS, 'Results Metrics', 'results_metrics', self::FIELD_RESULT_METRIC_ITEM, 'Add Result Metric', $logic),
			self::make_simple_repeater(self::FIELD_LESSONS_LEARNED, 'Lessons Learned', 'lessons_learned', self::FIELD_LESSON_LEARNED_ITEM, 'Add Lesson', $logic),
		], 'location' => self::post_location_rule(), 'active' => true, 'show_in_rest' => 1]);
	}

	private static function register_research_field_group() {
		$logic = self::layout_conditional_logic('research');
		acf_add_local_field_group(['key' => 'group_gtmstack_layout_research', 'title' => 'Research Layout', 'fields' => [
			self::make_simple_repeater(self::FIELD_KEY_FINDINGS, 'Key Findings', 'key_findings', self::FIELD_KEY_FINDING_ITEM, 'Add Finding', $logic),
			['key' => self::FIELD_IMPLICATIONS, 'label' => 'Implications', 'name' => 'implications', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
			self::make_simple_repeater(self::FIELD_RECOMMENDED_ACTIONS, 'Recommended Actions', 'recommended_actions', self::FIELD_RECOMMENDED_ACTION_ITEM, 'Add Action', $logic),
			['key' => self::FIELD_SOURCE_NOTE, 'label' => 'Source Note', 'name' => 'source_note', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
		], 'location' => self::post_location_rule(), 'active' => true, 'show_in_rest' => 1]);
	}

	private static function register_guide_field_group() {
		$logic = self::layout_conditional_logic('guide');
		acf_add_local_field_group(['key' => 'group_gtmstack_layout_guide', 'title' => 'Guide Layout', 'fields' => [
			self::make_simple_repeater(self::FIELD_GUIDE_KEY_POINTS, 'Guide Key Points', 'guide_key_points', self::FIELD_GUIDE_KEY_POINT_ITEM, 'Add Key Point', $logic),
			self::make_simple_repeater(self::FIELD_GUIDE_STEPS, 'Guide Steps', 'guide_steps', self::FIELD_GUIDE_STEP_ITEM, 'Add Step', $logic),
			['key' => self::FIELD_GUIDE_SUMMARY, 'label' => 'Guide Summary', 'name' => 'guide_summary', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => $logic],
		], 'location' => self::post_location_rule(), 'active' => true, 'show_in_rest' => 1]);
	}

	public static function register_pattern_category() {
		if (!function_exists('register_block_pattern_category')) {
			return;
		}
		register_block_pattern_category('gtmstack-blog', ['label' => __('GTMStack Blog', 'gtmstack-headless-blog-kit')]);
	}

	public static function register_block_patterns() {
		if (!function_exists('register_block_pattern')) {
			return;
		}

		$pattern_content = <<<HTML
<!-- wp:paragraph -->
<p>Account-Based Marketing (ABM) works best when it focuses resources on high-fit accounts instead of spreading spend too broadly. Use this template to turn strategy into an action-oriented playbook.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Define Clear Objectives and Measurable KPIs</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Explain what success looks like. Use concrete goals such as pipeline influence, account engagement, opportunity creation, or sourced revenue.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Prioritize Your Target Accounts</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Describe how to segment and rank accounts based on fit, intent, timing, and expected revenue potential.</p>
<!-- /wp:paragraph -->
HTML;

		register_block_pattern('gtmstack-headless-blog-kit/how-to-playbook', [
			'title' => __('How-To / Playbook Blog Starter', 'gtmstack-headless-blog-kit'),
			'description' => __('Starter body structure for a headless blog post that uses the How-To / Playbook layout in Next.js.', 'gtmstack-headless-blog-kit'),
			'categories' => ['gtmstack-blog'],
			'keywords' => ['blog', 'how-to', 'playbook', 'abm', 'b2b'],
			'postTypes' => ['post'],
			'viewportWidth' => 1200,
			'source' => 'plugin',
			'content' => $pattern_content,
		]);
	}
}

GTMStack_Headless_Blog_Kit::init();
