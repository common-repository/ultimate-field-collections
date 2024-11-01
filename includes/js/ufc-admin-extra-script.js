jQuery(document).ready(function ($) {

	/* Video Group Field  : Field Accepted File Type update on File Field and Media Field */
	jQuery(document).on("change, keydown, keyup, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-mime_types input.ufc-field-input[name$='[mime_types]']", function (e) {
		e.preventDefault();
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[mime_types]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[mime_types]']").val(jQuery(this).val());
		}
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[mime_types]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[mime_types]']").val(jQuery(this).val());
		}
	});

	/* Video Group Field  : Field Minimum Width update on File Field and Media Field */
	jQuery(document).on("change, keydown, keyup, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-width input.ufc-field-input[name$='[min_width]']", function (e) {
		e.preventDefault();
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[min_width]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[min_width]']").val(jQuery(this).val());
		}
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[min_width]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[min_width]']").val(jQuery(this).val());
		}
	});
	/* Video Group Field  : Field Maximum Width update on File Field and Media Field */
	jQuery(document).on("change, keydown, keyup, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-width input.ufc-field-input[name$='[max_width]']", function (e) {
		e.preventDefault();
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[max_width]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[max_width]']").val(jQuery(this).val());
		}
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[max_width]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[max_width]']").val(jQuery(this).val());
		}
	});

	/* Video Group Field  : Field Minimum Height update on File Field and Media Field */
	jQuery(document).on("change, keydown, keyup, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-height input.ufc-field-input[name$='[min_height]']", function (e) {
		e.preventDefault();
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[min_height]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[min_height]']").val(jQuery(this).val());
		}
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[min_height]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[min_height]']").val(jQuery(this).val());
		}
	});
	/* Video Group Field  : Field Maximum Height update on File Field and Media Field */
	jQuery(document).on("change, keydown, keyup, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-height input.ufc-field-input[name$='[max_height]']", function (e) {
		e.preventDefault();
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[max_height]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[max_height]']").val(jQuery(this).val());
		}
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[max_height]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[max_height]']").val(jQuery(this).val());
		}
	});

	/* Video Group Field  : Field Minimum File Size update on File Field and Media Field */
	jQuery(document).on("change, keydown, keyup, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-size input.ufc-field-input[name$='[min_size]']", function (e) {
		e.preventDefault();
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[min_size]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[min_size]']").val(jQuery(this).val());
		}
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[min_size]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[min_size]']").val(jQuery(this).val());
		}
	});
	/* Video Group Field  : Field Maximum File Size update on File Field and Media Field */
	jQuery(document).on("change, keydown, keyup, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-size input.ufc-field-input[name$='[max_size]']", function (e) {
		e.preventDefault();
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[max_size]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input[name$='[max_size]']").val(jQuery(this).val());
		}
		if (jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[max_size]']").length) {
			jQuery(this).closest(".field-edit-view-wrap.field-type-group").find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input[name$='[max_size]']").val(jQuery(this).val());
		}
	});

	/* Save on press ENTER : Create New Field Collection Name Input */
	jQuery(document).on("keypress", ".ultimate-field-collections-content-2 #ufc_create_field_collection_form input#Collection_Name", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.preventDefault();
			jQuery(".ultimate-field-collections-content-2 #ufc_create_field_collection_form #ufc_create_field_collection_submit").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Edit Field Collection Name Input */
	jQuery(document).on("keypress", ".ultimate-field-collections-content #ufc_settings_tab_content form#ufc_settings_form input#Collection_Name", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.preventDefault();
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Edit Field Collection > Custom Fields normal Inputs */
	jQuery(document).on("keypress", ".ultimate-field-collections-content #ufc_settings_tab_content form#ufc_settings_form .field-edit-view-wrap input.ufc-field-input.ufc-field-enter-to-save", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.preventDefault();
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Edit Field Collection > Field Unique Field Name Input */
	jQuery(document).on("keyup", ".ufc-group-custom-fields .field-edit-view-wrap .field-edit-content-main input.ufc-field-input.ufc-field-enter-to-focusout-and-save[name$='[name]']", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.preventDefault();
			var original_val = jQuery(this).val();
			var filtered_val = original_val
				.toLowerCase()
				.replace(/[^\w ]+/g, "")
				.replace(/ +/g, "_");
			jQuery(this).val(filtered_val);

			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Edit Field Collection > Field Label Input */
	jQuery(document).on("keypress", ".ufc-group-custom-fields .field-edit-view-wrap .field-edit-content-main input.ufc-field-input.ufc-field-enter-to-focusout-and-save[name$='[label]']", function (event) {

		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.preventDefault();

			var label_val = jQuery(this).val();
			var field_edit_wrap = jQuery(this).closest(".field-edit-view-wrap");
			field_edit_wrap.find(".edit-field-header .edit-field-name-header").first().html(label_val);
			var name_val = jQuery(this).closest(".field-edit-content-main").find("input[name$='[name]']").first().val();
			if (name_val.length == 0) {
				var new_name_val = label_val
					.toLowerCase()
					.replace(/[^\w ]+/g, "")
					.replace(/ +/g, "_");
				jQuery(this).closest(".field-edit-content-main").find("input[name$='[name]']").first().val(new_name_val);
				name_val = new_name_val;
			}

			if (field_edit_wrap.hasClass('field-type-group')) {
				/* Updated Video label and name */
				if (field_edit_wrap.children("input[name$='[ufc_field_video_group]']")) {

					field_edit_wrap
						.find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input.ufc-field-input[name$='[label]']")
						.val(label_val + ' File');
					field_edit_wrap
						.find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input.ufc-field-input[name$='[name]']")
						.val(name_val + '_file');

					field_edit_wrap
						.find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input.ufc-field-input[name$='[label]']")
						.val(label_val + ' oEmbed');

					field_edit_wrap
						.find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input.ufc-field-input[name$='[name]']")
						.val(name_val + '_oembed');
				}
			}

			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Edit Field Collection > Field Name Input */
	jQuery(document).on("keypress", ".ufc-group-custom-fields .field-edit-view-wrap .field-edit-content-main input.ufc-field-input.ufc-field-enter-to-focusout-and-save[name$='[name]']", function (event) {

		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.preventDefault();

			var group_label_val = jQuery(this).val();
			var field_edit_wrap = jQuery(this).closest(".field-edit-view-wrap");
			var group_name_val = jQuery(this).closest(".field-edit-content-main").find("input[name$='[name]']").first().val();

			if (group_name_val.length) {
				var temp_group_name_val = group_name_val
					.toLowerCase()
					.replace(/[^\w ]+/g, "")
					.replace(/ +/g, "_");

				group_name_val = temp_group_name_val;

			} else if (group_label_val.length) {
				group_name_val = group_label_val
					.toLowerCase()
					.replace(/[^\w ]+/g, "")
					.replace(/ +/g, "_");
			}

			if (field_edit_wrap.hasClass('field-type-group')) {
				/* Updated Video label and name */
				if (field_edit_wrap.children("input[name$='[ufc_field_video_group]']")) {

					field_edit_wrap
						.find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input.ufc-field-input[name$='[name]']")
						.val(group_name_val + '_file');

					field_edit_wrap
						.find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input.ufc-field-input[name$='[name]']")
						.val(group_name_val + '_oembed');
				}
			}

			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Video Group Field : Field Accepted File Type update on File Field and Media Field */
	jQuery(document).on("keypress", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-mime_types input.ufc-field-input[name$='[mime_types]']", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.preventDefault();
			var field_edit_wrap = jQuery(this).closest(".field-edit-view-wrap.field-type-group");
			var field_sub_fields_wrap = field_edit_wrap.find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap");

			if (field_sub_fields_wrap.find(".field-type-file input[name$='[mime_types]']").length) {
				field_sub_fields_wrap.find(".field-type-file input[name$='[mime_types]']").val(jQuery(this).val());
			}
			if (field_sub_fields_wrap.find(".field-type-oembed input[name$='[mime_types]']").length) {
				field_sub_fields_wrap.find(".field-type-oembed input[name$='[mime_types]']").val(jQuery(this).val());
			}
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Video Group Field : Field Minimum Width update on File Field and Media Field */
	jQuery(document).on("keypress", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-width input.ufc-field-input[name$='[min_width]']", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {

			event.preventDefault();
			var field_edit_wrap = jQuery(this).closest(".field-edit-view-wrap.field-type-group");
			var field_sub_fields_wrap = field_edit_wrap.find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap");

			if (field_sub_fields_wrap.find(".field-type-file input[name$='[min_width]']").length) {
				field_sub_fields_wrap.find(".field-type-file input[name$='[min_width]']").val(jQuery(this).val());
			}
			if (field_sub_fields_wrap.find(".field-type-oembed input[name$='[min_width]']").length) {
				field_sub_fields_wrap.find(".field-type-oembed input[name$='[min_width]']").val(jQuery(this).val());
			}
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});
	/* Save on press ENTER : Video Group Field : Field Maximum Width update on File Field and Media Field */
	jQuery(document).on("keypress", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-width input.ufc-field-input[name$='[max_width]']", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {

			event.preventDefault();
			var field_edit_wrap = jQuery(this).closest(".field-edit-view-wrap.field-type-group");
			var field_sub_fields_wrap = field_edit_wrap.find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap");

			if (field_sub_fields_wrap.find(".field-type-file input[name$='[max_width]']").length) {
				field_sub_fields_wrap.find(".field-type-file input[name$='[max_width]']").val(jQuery(this).val());
			}
			if (field_sub_fields_wrap.find(".field-type-oembed input[name$='[max_width]']").length) {
				field_sub_fields_wrap.find(".field-type-oembed input[name$='[max_width]']").val(jQuery(this).val());
			}
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Video Group Field : Field Minimum Height update on File Field and Media Field */
	jQuery(document).on("keypress", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-height input.ufc-field-input[name$='[min_height]']", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {

			event.preventDefault();
			var field_edit_wrap = jQuery(this).closest(".field-edit-view-wrap.field-type-group");
			var field_sub_fields_wrap = field_edit_wrap.find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap");

			if (field_sub_fields_wrap.find(".field-type-file input[name$='[min_height]']").length) {
				field_sub_fields_wrap.find(".field-type-file input[name$='[min_height]']").val(jQuery(this).val());
			}
			if (field_sub_fields_wrap.find(".field-type-oembed input[name$='[min_height]']").length) {
				field_sub_fields_wrap.find(".field-type-oembed input[name$='[min_height]']").val(jQuery(this).val());
			}
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});
	/* Save on press ENTER : Video Group Field : Field Maximum Height update on File Field and Media Field */
	jQuery(document).on("keypress", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-height input.ufc-field-input[name$='[max_height]']", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {

			event.preventDefault();
			var field_edit_wrap = jQuery(this).closest(".field-edit-view-wrap.field-type-group");
			var field_sub_fields_wrap = field_edit_wrap.find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap");

			if (field_sub_fields_wrap.find(".field-type-file input[name$='[max_height]']").length) {
				field_sub_fields_wrap.find(".field-type-file input[name$='[max_height]']").val(jQuery(this).val());
			}
			if (field_sub_fields_wrap.find(".field-type-oembed input[name$='[max_height]']").length) {
				field_sub_fields_wrap.find(".field-type-oembed input[name$='[max_height]']").val(jQuery(this).val());
			}
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Video Group Field : Field Minimum File Size update on File Field and Media Field */
	jQuery(document).on("keypress", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-size input.ufc-field-input[name$='[min_size]']", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {

			event.preventDefault();
			var field_edit_wrap = jQuery(this).closest(".field-edit-view-wrap.field-type-group");
			var field_sub_fields_wrap = field_edit_wrap.find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap");

			if (field_sub_fields_wrap.find(".field-type-file input[name$='[min_size]']").length) {
				field_sub_fields_wrap.find(".field-type-file input[name$='[min_size]']").val(jQuery(this).val());
			}
			if (field_sub_fields_wrap.find(".field-type-oembed input[name$='[min_size]']").length) {
				field_sub_fields_wrap.find(".field-type-oembed input[name$='[min_size]']").val(jQuery(this).val());
			}
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});
	/* Save on press ENTER : Video Group Field : Field Maximum File Size update on File Field and Media Field */
	jQuery(document).on("keypress", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-main .field-edit-content-row.video-group-parent-fields.video-group-field-size input.ufc-field-input[name$='[max_size]']", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {

			event.preventDefault();
			var field_edit_wrap = jQuery(this).closest(".field-edit-view-wrap.field-type-group");
			var field_sub_fields_wrap = field_edit_wrap.find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap");

			if (field_sub_fields_wrap.find(".field-type-file input[name$='[max_size]']").length) {
				field_sub_fields_wrap.find(".field-type-file input[name$='[max_size]']").val(jQuery(this).val());
			}
			if (field_sub_fields_wrap.find(".field-type-oembed input[name$='[max_size]']").length) {
				field_sub_fields_wrap.find(".field-type-oembed input[name$='[max_size]']").val(jQuery(this).val());
			}
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});

	/* Save on press ENTER : Radio, Checkbox, Select Field Option Label */
	jQuery(document).on("keyup", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-radio .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_values][]'], .ufc-group-custom-fields .field-edit-view-wrap.field-type-button_group .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_values][]'], .ufc-group-custom-fields .field-edit-view-wrap.field-type-checkbox .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_values][]'], .ufc-group-custom-fields .field-edit-view-wrap.field-type-select .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_values][]']", function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.preventDefault();

			var label_val = jQuery(this).val();
			var name_val = jQuery(this).closest(".field-edit-content-row").find("input[name$='[choice_keys][]']").first().val();
			if (name_val.length == 0) {
				var new_name_val = label_val
					.toLowerCase()
					.replace(/[^\w ]+/g, "")
					.replace(/ +/g, "_");
				jQuery(this).closest(".field-edit-content-row").find("input[name$='[choice_keys][]']").first().val(new_name_val);
			}

			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});





	/* Moved from Main JS file */

	/* Go back to Field Collection List */
	jQuery(document).on("click", "#ufc_settings_tab_content .back-button", function (e) {
		e.preventDefault();
		jQuery(".ultimate-field-collections-sidebar").removeClass("active");
		jQuery('.ultimate-field-collections-sidebar ul.ufc-fields-list-wrap li.ufc-field-list-item').removeClass("ufc-select-field-group");
	});

	/* Go back to Field Collection List */
	jQuery(document).on("click", "#ufc_field_data_tab_content .ufc-field-data-section-content .back-button", function (e) {
		e.preventDefault();
		jQuery(".ufc-field-data-section-sidebar").removeClass("active");
		jQuery("#ufc_field_data_tab_content .ufc-field-data-section-content").html("");
		jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item').removeClass('ufc-select-field-group');
	});

	/* Field Collections : Delete/Duplicate Field Collection */
	jQuery(document).on("click", ".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap li.ufc-field-list-item .ufc-field-list-item-actions", function (e) {
		e.preventDefault();
		e.stopPropagation();
	});

	/* Edited Field Collection : Hide/Show Settings Tab Fields section */
	jQuery(document).on("click", ".field-edit-view-wrap .edit-field-header", function (e) {
		e.preventDefault();
		jQuery(this).closest(".field-edit-view-wrap").toggleClass("field-edit-view-open");
	});
	jQuery(document).on("click", ".field-edit-view-wrap .edit-field-header > span.edit-field-trigger-reorder", function (e) {
		e.preventDefault();
		e.stopPropagation();
	});

	/* Edited Field Collection : Remove option from Dropdown Fields section */
	jQuery(document).on("click", ".field-edit-options-wrap .field-edit-content-row .field-edit-col .field-edit-duplicate-option", function (e) {
		e.preventDefault();
		e.stopPropagation();
	});

	/* Field Collection Row : Stop Hide/show the details view */
	jQuery(document).on("click", ".field-edit-view-wrap .edit-field-header .edit-field-actions .edit-field-trigger-action", function (e) {
		e.preventDefault();
		e.stopPropagation();
	});

	/* Edited Field Collection : Add field Settings Tab section */
	jQuery(document).on("click", "form#ufc_settings_form .ufc-group-custom-fields .ufc_group_new_field", function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (jQuery("form#ufc_settings_form .ufc-group-custom-fields-footer .ufc-group-custom-fields-icons:visible").length) {
			jQuery("form#ufc_settings_form .ufc-group-custom-fields-footer .ufc-group-custom-fields-icons").hide();
		} else {
			jQuery("form#ufc_settings_form .ufc-group-custom-fields-footer .ufc-group-custom-fields-icons").css("display", "grid");
		}
		// jQuery("html, body").animate(
		// 	{
		// 		scrollTop: jQuery(".ufc-group-custom-fields-footer .ufc-group-custom-fields-icons").offset().top,
		// 	},
		// 	1000
		// );
	});

	/* Edited Field Collection : When Group field layout style changed on Settings Tab section */
	jQuery(document).on("change", "form#ufc_settings_form .ufc-group-custom-fields .field-edit-view-wrap.field-type-group .field-edit-content-row.ufc-group-layout-style-row input.ufc-field-radio", function (e) {
		e.preventDefault();
		e.stopPropagation();
		jQuery(this).closest(".field-edit-content-row.ufc-group-layout-style-row").find("input.ufc-group-layout-style").val(jQuery(this).val());
	});
	/* Edited Field Collection : When Group field layout style changed on Settings Tab section */
	jQuery(document).on("change", "form#ufc_settings_form .ufc-group-custom-fields .field-edit-view-wrap.field-type-repeater .field-edit-content-row.ufc-repeater-layout-style-row input.ufc-repeater-layout-style", function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (jQuery(this).val() == "Tab") {
			jQuery(this).closest(".field-edit-view-wrap.field-type-repeater").find(".field-edit-content-row.ufc-repeater-tabs-style-row").show();
			jQuery(this).closest(".field-edit-view-wrap.field-type-repeater").find('.field-edit-content-row.ufc-repeater-tabs-style-row input.ufc-repeater-tabs-style[value="vertical"]').prop("checked", true);
		} else {
			jQuery(this).closest(".field-edit-view-wrap.field-type-repeater").find(".field-edit-content-row.ufc-repeater-tabs-style-row").hide();
			jQuery(this).closest(".field-edit-view-wrap.field-type-repeater").find(".field-edit-content-row.ufc-repeater-tabs-style-row input.ufc-repeater-tabs-style").prop("checked", false);
		}
	});

	/* Edited Field Collection : Add field Settings Tab section */
	jQuery(document).on("click", ".ufc-group-accordion-view-main .ufc-group-accordion-header", function (e) {
		e.preventDefault();
		e.stopPropagation();
		jQuery(this).closest(".ufc-group-accordion-view-main").toggleClass("ufc-group-accordion-open");
	});
	jQuery(document).on("click", ".acf-field.acf-field-repeater .ufc-repeater-list-body .acf-row .ufc-repeater-sub-fields-title", function (e) {
		e.preventDefault();
		e.stopPropagation();
		jQuery(this).closest(".acf-row").toggleClass("ufc-repeater-accordion-open");
	});
	jQuery(document).on("click", ".ufc-accordion-view-main .ufc-accordion-header", function (e) {
		e.preventDefault();
		e.stopPropagation();
		jQuery(this).closest(".ufc-accordion-view-main").toggleClass("ufc-accordion-open");
	});

	/* Link Button : Close the Link value */
	jQuery(document).on("click", ".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-close, .ultimate-field-collections-content .ufc-field-data-section-content #wp-link-backdrop, .ultimate-field-collections-content .ufc-field-data-section-content #wp-link-cancel button.button", function (e) {
		e.preventDefault();
		e.stopPropagation();
		jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-backdrop").hide();
		jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap").hide();
	});

	/* Taxonomy Create Term : Close the popup */
	jQuery(document).on("click", ".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box .title .acf-icon.-cancel", function (e) {
		e.preventDefault();
		e.stopPropagation();
		jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup").hide();
	});

	/* Field Collections : Field Option Label and Option Value */
	jQuery(document).on("keyup", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-radio .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_keys][]'], .ufc-group-custom-fields .field-edit-view-wrap.field-type-checkbox .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_keys][]'], .ufc-group-custom-fields .field-edit-view-wrap.field-type-select .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_keys][]']", function (e) {
		var keycode = (e.keyCode ? e.keyCode : e.which);
		e.preventDefault();
		var original_val = jQuery(this).val();
		var filtered_val = original_val
			.toLowerCase()
			.replace(/[^\w ]+/g, "")
			.replace(/ +/g, "_");
		jQuery(this).val(filtered_val);
		if (keycode == '13') {
			e.preventDefault();
			jQuery(".ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #ufc_content_save").trigger("click");
			return false;
		}
	});
	jQuery(document).on("change, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-radio .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_values][]'],.ufc-group-custom-fields .field-edit-view-wrap.field-type-button_group .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_values][]'], .ufc-group-custom-fields .field-edit-view-wrap.field-type-checkbox .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_values][]'], .ufc-group-custom-fields .field-edit-view-wrap.field-type-select .field-edit-content-main .field-edit-options-lists .field-edit-col input.ufc-field-input[name$='[choice_values][]']", function (e) {
		e.preventDefault();
		var label_val = jQuery(this).val();
		var name_val = jQuery(this).closest(".field-edit-content-row").find("input[name$='[choice_keys][]']").first().val();
		if (name_val.length == 0) {
			var new_name_val = label_val
				.toLowerCase()
				.replace(/[^\w ]+/g, "")
				.replace(/ +/g, "_");
			jQuery(this).closest(".field-edit-content-row").find("input[name$='[choice_keys][]']").first().val(new_name_val);
		}
	});



	/* Edit Permalink: Show edit input */
	jQuery(document).on("click", ".ultimate-field-collections-content .ufc-field-data-section-content #edit-slug-buttons button.edit-slug", function (e) {
		e.preventDefault();
		e.stopPropagation();
		var button_ele = jQuery(this);
		var i, slug_value,
			$el, revert_e,
			c = 0,
			ufc_post_id = button_ele.closest('form#ufc_field_post_meta_form').find('#acf-form-data').find('input[name="ufc_field_post_id"]').val(),
			real_slug = button_ele.closest('.ufc-slug-edit-wrap').find('#ufc_post_name_input'),
			revert_slug = real_slug.val(),
			edit_slug_box = button_ele.closest('#edit-slug-box'),
			permalink = edit_slug_box.find('#sample-permalink'),
			permalinkOrig = permalink.html(),
			permalinkInner = button_ele.closest('.ufc-slug-edit-wrap').find('#sample-permalink').find('a').html(),
			buttons = button_ele.closest('#edit-slug-buttons'),
			buttonsOrig = buttons.html(),
			full = button_ele.closest('.ufc-slug-edit-wrap').find('#editable-post-name-full');

		// Deal with Twemoji in the post-name.
		// full.find( 'img' ).replaceWith( function() { return this.alt; } );
		full = full.html();

		permalink.html(permalinkInner);

		// Save current content to revert to when cancelling.
		$el = button_ele.closest('.ufc-slug-edit-wrap').find('#editable-post-name');
		revert_e = $el.html();

		buttons.html(
			'<button type="button" class="save button button-small">OK</button> ' +
			'<button type="button" class="cancel button-link">Cancel</button>'
		);

		// Save permalink changes.
		buttons.children('.save').on('click', function () {
			var new_slug = $el.children('input').val();

			if (new_slug == button_ele.closest('.ufc-slug-edit-wrap').find('#editable-post-name-full').text()) {
				buttons.children('.cancel').trigger('click');
				return;
			}

			console.log(UFC_Admin_Page_args);


			var ufc_post_permalink_data = {
				action: 'ufc_check_available_post_permalink',
				ufc_post_id: ufc_post_id,
				new_slug: new_slug,
				new_title: button_ele.closest('.ufc-slug-edit-wrap').find('#ufc_post_title_input').val(),
				nonce: UFC_Admin_Page_args.ufc_ajax_nonce,
				// samplepermalinknonce: $('#samplepermalinknonce').val()
			};
			console.log(ufc_post_permalink_data);

			jQuery.ajax({
				method: "post",
				url: UFC_Admin_Page_args.ajax_url,
				data: ufc_post_permalink_data,
				success: function (response) {
					response = JSON.parse(response);

					console.log(response);

					if (response.sample_permalink_html) {

						console.log(response.sample_permalink_html);
						edit_slug_box.html(response.sample_permalink_html);
						if (edit_slug_box.hasClass('hidden')) {
							edit_slug_box.fadeIn('fast', function () {
								edit_slug_box.removeClass('hidden');
							});
						}

						// buttons.html(buttonsOrig);
						// permalink.html(permalinkOrig);
						real_slug.val(new_slug);
						// $( '.edit-slug' ).trigger( 'focus' );
						// wp.a11y.speak( 'Permalink saved' );
					}

					if (response.success) {
					}

					/*
					if (response.sample_permalink_html) {
						// jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").html(response.sample_permalink_html);

					} else {
						// jQuery(".ultimate-field-collections-page-wrap").css("opacity", "").css("pointer-events", "");
					}
					*/
				},
			});


			/*
			jQuery.post(
				UFC_Admin_Page_args.ajax_url,
				{
					action: 'ufc_check_available_post_permalink',
					ufc_post_id: ufc_post_id,
					new_slug: new_slug,
					new_title: jQuery(this).closest('.ufc-tab-content-header').find('#ufc_post_title_input').val(),
					nonce: UFC_Admin_Page_args.ufc_ajax_nonce,
					// samplepermalinknonce: $('#samplepermalinknonce').val()
				},
				function(data) {
					
					response = JSON.parse(data);

console.log( response );

					if ( response.success ) {
						if ( response.sample_permalink_html ) {
							
							var box = jQuery(this).closest('#edit-slug-box');
							box.html(response.sample_permalink_html);
							if (box.hasClass('hidden')) {
								box.fadeIn('fast', function () {
									box.removeClass('hidden');
								});
							}

							buttons.html(buttonsOrig);
							permalink.html(permalinkOrig);
							real_slug.val(new_slug);
							// $( '.edit-slug' ).trigger( 'focus' );
							// wp.a11y.speak( 'Permalink saved' );
						}
					}
				}
			);
			*/

		});

		// Cancel editing of permalink.
		buttons.children('.cancel').on('click', function () {
			// $('#view-post-btn').show();
			$el.html(revert_e);
			buttons.html(buttonsOrig);
			permalink.html(permalinkOrig);
			real_slug.val(revert_slug);
			// $( '.edit-slug' ).trigger( 'focus' );
		});

		// If more than 1/4th of 'full' is '%', make it empty.
		for (i = 0; i < full.length; ++i) {
			if ('%' == full.charAt(i))
				c++;
		}
		slug_value = (c > full.length / 4) ? '' : full;

		$el.html(
			'<input type="text" id="new-post-slug" value="' + slug_value + '" autocomplete="off" spellcheck="false" style="border: 1px solid #8c8f94;" />'
		).children('input').on('keydown', function (e) {
			var key = e.which;
			// On [Enter], just save the new slug, don't save the post.
			if (13 === key) {
				e.preventDefault();
				buttons.children('.save').trigger('click');
			}
			// On [Esc] cancel the editing.
			if (27 === key) {
				buttons.children('.cancel').trigger('click');
			}
		}).on('keyup', function () {
			real_slug.val(this.value);
		}).trigger('focus');
	});




	var ufc_field_uniqidSeed = '';

	ufc_field_uniqid = function (prefix, moreEntropy) {
		//  discuss at: http://locutus.io/php/uniqid/
		// original by: Kevin van Zonneveld (http://kvz.io)
		//  revised by: Kankrelune (http://www.webfaktory.info/)
		//      note 1: Uses an internal counter (in locutus global) to avoid collision
		//   example 1: var $id = uniqid()
		//   example 1: var $result = $id.length === 13
		//   returns 1: true
		//   example 2: var $id = uniqid('foo')
		//   example 2: var $result = $id.length === (13 + 'foo'.length)
		//   returns 2: true
		//   example 3: var $id = uniqid('bar', true)
		//   example 3: var $result = $id.length === (23 + 'bar'.length)
		//   returns 3: true
		if (typeof prefix === 'undefined') {
			prefix = '';
		}

		var retId;

		var formatSeed = function (seed, reqWidth) {
			seed = parseInt(seed, 10).toString(16); // to hex str

			if (reqWidth < seed.length) {
				// so long we split
				return seed.slice(seed.length - reqWidth);
			}

			if (reqWidth > seed.length) {
				// so short we pad
				return Array(1 + (reqWidth - seed.length)).join('0') + seed;
			}

			return seed;
		};

		if (!ufc_field_uniqidSeed) {
			// init seed with big random int
			ufc_field_uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
		}

		ufc_field_uniqidSeed++;
		retId = prefix; // start with prefix, add current milliseconds hex string

		retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
		retId += formatSeed(ufc_field_uniqidSeed, 5); // add seed hex string

		if (moreEntropy) {
			// for more entropy we add a float lower to 10
			retId += (Math.random() * 10).toFixed(8).toString();
		}

		return retId;
	};


	/* Edited Field Collection : Duplicate Field */
	/*
	jQuery(document).on("click", ".field-edit-view-wrap .edit-field-header .edit-field-actions ul.edit-field-actions-ul .edit-field-duplicate-action", function (e) {
		e.preventDefault();
		e.stopPropagation();

		ufcFormUnsaved = true;


		var acf_field_wrap = jQuery(this).closest(".field-edit-view-wrap");
		var acf_field_id = acf_field_wrap.attr("data-acf_field_id");
		var acf_field_type = acf_field_wrap.find("input[name$='[type]']").first().val();
		var acf_field_key = acf_field_wrap.find("input[name$='[key]']").first().val();
		var acf_field_parent = acf_field_wrap.find("input[name$='[parent]']").first().val();

		var field_group_id = jQuery(this).closest("#ufc_settings_form").find("#ufc_field_group_id").val();
		var field_group_key = jQuery(this).closest("#ufc_settings_form").find("#ufc_field_group_key").val();

		// jQuery(".ufc-field-data-section-wrap .ufc-field-data-section-content").html("");
		// jQuery(".ultimate-field-collections-page-wrap").css("opacity", "0.7").css("pointer-events", "none");

	  // vars
	  var ufc_new_field_key = ufc_field_uniqid('field_'); // duplicate
console.log( ufc_new_field_key );
	var ufc_new_field_wrap = acf_field_wrap.clone(); // rename

		ufc_new_field_wrap.addClass('field-edit-view-open');

var ufc_new_field_label = ufc_new_field_wrap.find("input.ufc-field-input[name$='[label]']").first().val();
ufc_new_field_label += ' (Copy)';
ufc_new_field_wrap.find("input.ufc-field-input[name$='[label]']").first().val( ufc_new_field_label );


var ufc_new_field_name = ufc_new_field_wrap.find("input.ufc-field-input[name$='[name]']").first().val();
ufc_new_field_name += '_copy';
ufc_new_field_wrap.find("input.ufc-field-input[name$='[name]']").first().val( ufc_new_field_name );


		// var ufc_r_clone_word = '="'+ acf_field_id +'"';
		// var ufc_r_clone_regex = new RegExp(ufc_r_clone_word, "gi");
		// let ufc_r_clone_count = (ufc_new_field_wrap.match(ufc_r_clone_regex) || []).length;
		// for (var i = 0; i <= ufc_r_clone_count; i++) {
		// 	ufc_new_field_wrap = ufc_new_field_wrap.replace(ufc_r_clone_word, '="'+ ufc_new_field_key +'"');
		// }

		jQuery(ufc_new_field_wrap).insertAfter(acf_field_wrap);


	});
	*/

});