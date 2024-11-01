jQuery(document).ready(function ($) {

    /* Field Collection : Group Fields Sortable */
    function ufc_update_field_group_list_menu_order() {
        if (jQuery(".ultimate-field-collections-content #ufc_settings_tab_content .ufc-group-custom-fields .ufc-group-custom-fields-content > .field-edit-view-wrap").length) {
            var i = 0;
            jQuery(".ultimate-field-collections-content #ufc_settings_tab_content .ufc-group-custom-fields .ufc-group-custom-fields-content > .field-edit-view-wrap").each(function (el) {
                jQuery(this).find("input[name$='[menu_order]']").first().val(i);
                i++;
            });
        }

        if (jQuery(".ultimate-field-collections-content #ufc_settings_tab_content .ufc-group-custom-fields .field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap").length) {
            jQuery(".ultimate-field-collections-content #ufc_settings_tab_content .ufc-group-custom-fields .field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists").each(function (el) {
                var i = 0;
                jQuery(this)
                    .find(".field-edit-view-wrap")
                    .each(function (el) {
                        jQuery(this).find("input[name$='[menu_order]']").first().val(i);
                        i++;
                    });
            });
        }
    }

    function ufc_field_group_list_sortable() {
        setTimeout(function () {
            if (jQuery(".ultimate-field-collections-content #ufc_settings_tab_content .ufc-group-custom-fields .ufc-group-custom-fields-content .field-edit-view-wrap").length) {
                jQuery(".ultimate-field-collections-content #ufc_settings_tab_content .ufc-group-custom-fields .ufc-group-custom-fields-content").sortable({
                    handle: ".edit-field-trigger-reorder",
                    /*items: ".field-edit-view-wrap",*/
                    update: function (event, ui) {
                        ufc_update_field_group_list_menu_order();
                        ufcFormUnsaved = true;
                    },
                });
            }

            jQuery(".ultimate-field-collections-content #ufc_settings_tab_content .ufc-group-custom-fields .ufc-group-custom-fields-content  .field-edit-view-wrap.field-type-repeater").each(function (el) {
                jQuery(this)
                    .find(".field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists")
                    .sortable({
                        handle: ".edit-field-trigger-reorder",
                        /*items: ".field-edit-view-wrap",*/
                        update: function (event, ui) {
                            ufc_update_field_group_list_menu_order();
                            ufcFormUnsaved = true;
                        },
                    });
            });
            if (jQuery(".ultimate-field-collections-content #ufc_settings_tab_content .ufc-group-custom-fields .field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists .field-edit-view-wrap").length) {
                jQuery(".ultimate-field-collections-content #ufc_settings_tab_content .ufc-group-custom-fields .field-edit-repeater-content-wrap .field-edit-repeater-sub_fields-lists").sortable({
                    handle: ".edit-field-trigger-reorder",
                    /*items: ".field-edit-view-wrap",*/
                    update: function (event, ui) {
                        ufc_update_field_group_list_menu_order();
                        ufcFormUnsaved = true;
                    },
                });
            }
        }, 2000);
    }

    if (jQuery(".ultimate-field-collections-page-wrap").length) {

        var ufcFormUnsaved = false;
        var ufcSettingsFormNeedReload = false;
        var ufcFormUnsavedConfirmationMessage = 'It looks like you have been editing something. If you leave before saving, your changes will be lost.';
        var ufcDeleteConfirmationMessage = 'Are you sure to delete?';
        var ufcRestoreConfirmationMessage = 'Are you sure Restore from Trash?';

        window.onload = function () {
            window.addEventListener("beforeunload", function (e) {

                if (ufcFormUnsaved) {
                    (e || window.event).returnValue = ufcFormUnsavedConfirmationMessage; /* Gecko + IE */
                    return ufcFormUnsavedConfirmationMessage; /* Gecko + Webkit, Safari, Chrome etc. */
                }
                return undefined;
            });
        };

        if (jQuery(".ultimate-field-collections-content").length) {
            if (jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_id') != '') {
                var auto_edit_collection_id = jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_id');
                if (jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item[data-field_group_id='" + auto_edit_collection_id + "']").length) {
                    setTimeout(function () {
                        jQuery('.ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item[data-field_group_id="' + auto_edit_collection_id + '"]').trigger("click");
                    }, 100);
                }
            }
        }

    }

    /* Field Collections : Edit Field Collection */
    jQuery(document).on("click", ".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item, .ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item .ufc-field-list-item-tab-btns button", function (e) {
        e.preventDefault();

        if (jQuery(this).is("li")) {
            if (jQuery(this).attr("data-status") == "trash") {
                return false;
            }
        }

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }

        ufcFormUnsaved = false;

        jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item").removeClass("ufc-select-field-group");
        var field_group_el = jQuery(this);

        if (field_group_el.is("li")) {
            var field_group_id = field_group_el.attr("data-field_group_id");
            var field_group_key = field_group_el.attr("data-field_group_key");
        } else if (field_group_el.is("button")) {
            var field_group_id = field_group_el.parents("li.ufc-field-list-item").attr("data-field_group_id");
            var field_group_key = field_group_el.parents("li.ufc-field-list-item").attr("data-field_group_key");
        }


        if (field_group_id != "" && field_group_key != "") {
            if (field_group_el.is("li")) {
                field_group_el.addClass("ufc-select-field-group");
            } else if (field_group_el.is("button")) {
                field_group_el.parents("li.ufc-field-list-item").addClass("ufc-select-field-group");
            }

            // jQuery(".ultimate-field-collections-content-2").hide();
            // jQuery(".ultimate-field-collections-content").show();

            /*jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").html('');*/
            jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
            var ufc_field_group_data = {
                action: "ufc_select_field_group",
                nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
                ufc_field_group_id: field_group_id,
                ufc_field_group_key: field_group_key,
            };

            var collection_link = UFC_Admin_Ajax.ufc_admin_page_url;
            collection_link += "&collection=";
            collection_link += field_group_id;

            if (field_group_el.is("li")) {
                e.preventDefault();
                e.stopPropagation();

                var url_string = window.location.href;
                var url = new URL(url_string);

                if (jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_tab') === "settings") {

                    collection_link += "&tab=fields";
                    window.history.pushState('', '', collection_link);
                    jQuery(".ultimate-field-collections-page-wrap").attr(
                        {
                            "data-collection_list": "active",
                            "data-collection_settings": "active",
                            "data-post_list": "",
                            "data-post_content": "",
                            "data-create_field_collection": ""
                        }
                    );
                } else if (jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_tab') === "content") {

                    collection_link += "&tab=content";
                    window.history.pushState('', '', collection_link);
                    jQuery(".ultimate-field-collections-page-wrap").attr(
                        {
                            "data-collection_list": "active",
                            "data-collection_settings": "",
                            "data-post_list": "active",
                            "data-post_content": "",
                            "data-create_field_collection": ""
                        }
                    );
                } else {

                    collection_link += "&tab=fields";
                    window.history.pushState('', '', collection_link);
                    jQuery(".ultimate-field-collections-page-wrap").attr(
                        {
                            "data-collection_list": "active",
                            "data-collection_settings": "active",
                            "data-post_list": "",
                            "data-post_content": "",
                            "data-create_field_collection": ""
                        }
                    );
                }

            } else if (field_group_el.attr("id") == "ufc_field_list_settings_data") {
                e.preventDefault();
                e.stopPropagation();
                // console.log("Fields button");
                collection_link += "&tab=fields";
                window.history.pushState('', '', collection_link);
                jQuery(".ultimate-field-collections-page-wrap").attr(
                    {
                        "data-collection_list": "active",
                        "data-collection_settings": "active",
                        "data-post_list": "",
                        "data-post_content": "",
                        "data-create_field_collection": ""
                    }
                );

                setTimeout(function () {
                    var ufc_field_group_data = {
                        action: "ufc_select_group_field_data",
                        nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
                        ufc_field_group_id: field_group_id,
                        ufc_field_group_key: field_group_key,
                    };

                    $.ajax({
                        method: "post",
                        url: UFC_Admin_Ajax.ajax_url,
                        data: ufc_field_group_data,
                        success: function (response) {
                            response = JSON.parse(response);
                            jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                            if (response.field_group_html) {
                                jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content #ufc_field_data_tab_content").html(response.field_group_html);

                                var auto_edit_collection_post_id = jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_post_id');
                                if (auto_edit_collection_post_id.length) {
                                    if (jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item[data-field_post_id="' + auto_edit_collection_post_id + '"]').length) {
                                        jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item[data-field_post_id="' + auto_edit_collection_post_id + '"]').trigger('click');
                                    }
                                    jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_post_id', '');
                                }
                            }
                        },
                    });
                }, 500);

            } else if (field_group_el.attr("id") == "ufc_field_list_field_data") {
                e.preventDefault();
                e.stopPropagation();
                // console.log("Content button");
                collection_link += "&tab=content";
                window.history.pushState('', '', collection_link);
                jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "");
                jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").css("opacity", "1");

                jQuery(".ultimate-field-collections-page-wrap").attr(
                    {
                        "data-collection_list": "active",
                        "data-collection_settings": "",
                        "data-post_list": "active",
                        "data-post_content": "",
                        "data-create_field_collection": ""
                    }
                );

                setTimeout(function () {
                    jQuery(this).addClass("ufc-active-tab");
                    jQuery(".ultimate-field-collections-content #ufc_field_data_tab_content").addClass("ufc-active-tab");
                    /*jQuery('.ufc-content-header-wrap .ufc-content-btns').hide();*/

                    // jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content #ufc_field_data_tab_content").html("");
                    jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
                    var ufc_field_group_data = {
                        action: "ufc_select_group_field_data",
                        nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
                        ufc_field_group_id: field_group_id,
                        ufc_field_group_key: field_group_key,
                    };

                    $.ajax({
                        method: "post",
                        url: UFC_Admin_Ajax.ajax_url,
                        data: ufc_field_group_data,
                        success: function (response) {
                            response = JSON.parse(response);
                            jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                            if (response.field_group_html) {
                                jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content #ufc_field_data_tab_content").html(response.field_group_html);
                                if (jQuery(".ultimate-field-collections-content .ufc-tab-content .ufc-field-data-section-wrap .ufc-field-data-section-sidebar .ufc-field-list-header").length) {
                                    jQuery('.ultimate-field-collections-page-wrap .ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #Add_New_Item').addClass("shown");
                                }
                                // if (jQuery(".ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item").length == 1) {
                                // 	jQuery("#ufc_field_data_tab_content .ufc-field-data-section-wrap").addClass("no-sidebar");
                                // 	jQuery(".ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item").trigger("click");
                                // }

                                var auto_edit_collection_post_id = jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_post_id');
                                if (auto_edit_collection_post_id.length) {
                                    if (jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item[data-field_post_id="' + auto_edit_collection_post_id + '"]').length) {
                                        jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item[data-field_post_id="' + auto_edit_collection_post_id + '"]').trigger('click');
                                    }
                                    jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_post_id', '');
                                }
                            }

                            jQuery(".ultimate-field-collections-page-wrap").attr(
                                {
                                    "data-collection_list": "active",
                                    "data-collection_settings": "",
                                    "data-post_list": "active",
                                    "data-post_content": "",
                                    "data-create_field_collection": ""
                                }
                            );
                        },
                    });
                    // jQuery(".ufc-content-header-wrap .ufc-content-tabs-wrap .ufc-content-tab[data-target_tab='field_data']").trigger("click");
                    // jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
                    // jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_id', '');
                    // jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_tab', '');
                    // jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").css("opacity", "");
                }, 500);
            }

            // window.history.pushState('', '', collection_link);

            $.ajax({
                method: "post",
                url: UFC_Admin_Ajax.ajax_url,
                data: ufc_field_group_data,
                success: function (response) {
                    response = JSON.parse(response);
                    if (response.field_group_html) {
                        jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").html(response.field_group_html);
                        jQuery("html").scrollTop(0);
                        if (jQuery("select.ufc-field-select2").length) {
                            jQuery("select.ufc-field-select2").select2();
                        }
                        ufc_field_group_list_sortable();

                        /* Show or hide Tab Content Header */
                        if (window.innerWidth <= 1000) {
                            jQuery(window).on("scroll", function () {
                                var scrolledPos = jQuery(this).scrollTop();
                                // console.log(scrolledPos);
                                if (scrolledPos >= 200) {
                                    jQuery(".ultimate-field-collections-content .ufc-tab-content-header").addClass("active");
                                } else {
                                    jQuery(".ultimate-field-collections-content .ufc-tab-content-header").removeClass("active");
                                }
                            });
                        }
                        Array.from(document.querySelectorAll('.ufc-tab-content-header input'), (input) => {
                            let parent = input.parentNode;
                            function updateSize() {
                                parent.dataset.value = input.value
                            }
                            input.addEventListener('input', updateSize);
                            updateSize();
                        });

                        if (jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_id') != '') {
                            var auto_edit_collection_id = jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_id');
                            var auto_edit_collection_tab = jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_tab');

                            if (auto_edit_collection_tab == 'settings') {
                                // console.log("settings tab");
                                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");


                            } else if (auto_edit_collection_tab == 'content') {
                                // console.log("content tab");
                                jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "");
                                jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").css("opacity", "1");

                                setTimeout(function () {
                                    jQuery(".ufc-content-header-wrap .ufc-content-tabs-wrap .ufc-content-tab[data-target_tab='field_data']").trigger("click");
                                    jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
                                    jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_id', '');
                                    jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_tab', '');
                                    jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").css("opacity", "");
                                }, 500);
                            }

                        } else {
                            jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                        }

                    } else {
                        jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                    }

                    jQuery(".ultimate-field-collections-sidebar").addClass("active");
                    // jQuery(".ultimate-field-collections-page-wrap").attr(
                    // 	{
                    // 		"data-collection_list": "active",
                    // 		"data-collection_settings": "",
                    // 		"data-post_list": "",
                    // 		"data-post_content": "",
                    // 		"data-create_field_collection": ""
                    // 	}
                    // );

                    setTimeout(function () {
                        var ufc_field_group_data = {
                            action: "ufc_select_group_field_data",
                            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
                            ufc_field_group_id: field_group_id,
                            ufc_field_group_key: field_group_key,
                        };

                        $.ajax({
                            method: "post",
                            url: UFC_Admin_Ajax.ajax_url,
                            data: ufc_field_group_data,
                            success: function (response) {
                                response = JSON.parse(response);
                                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                                if (response.field_group_html) {
                                    jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content #ufc_field_data_tab_content").html(response.field_group_html);
                                    if (jQuery(".ultimate-field-collections-content .ufc-tab-content .ufc-field-data-section-wrap .ufc-field-data-section-sidebar .ufc-field-list-header").length) {
                                        jQuery('.ultimate-field-collections-page-wrap .ultimate-field-collections-content .ufc-content-header-wrap .ufc-content-btns #Add_New_Item').addClass("shown");
                                    }

                                    var auto_edit_collection_post_id = jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_post_id');
                                    if (auto_edit_collection_post_id.length) {
                                        if (jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item[data-field_post_id="' + auto_edit_collection_post_id + '"]').length) {
                                            jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item[data-field_post_id="' + auto_edit_collection_post_id + '"]').trigger('click');
                                        }
                                        jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").attr('data-auto_edit_collection_post_id', '');
                                    }
                                }
                            },
                        });
                    }, 500);
                },
            });
        }
    });

    /* Field Collections : Open Edit Menu */
    jQuery(document).on("click", "[class*='trigger-action']", function (e) {
        e.preventDefault();
        e.stopPropagation();
        jQuery("[class*='-action']").removeClass("active");
        jQuery(this).parent().toggleClass("active");
    });
    
    
    jQuery(document).on("click", function (e) {
        if (jQuery("[class*='trigger-action']").parent().hasClass("active")) {
            jQuery("[class*='trigger-action']").parent().removeClass("active");
        }
        // console.log(jQuery(e.target), jQuery(e.target) != jQuery("input#post"));
        
        if(!jQuery(e.target).parents(".filters").hasClass("active") ){
            if (jQuery(".filter-action-list").parent().hasClass("active")) {
                jQuery(".filter-action-list").parent().removeClass("active");
            }
        }
    });

    // jQuery(document).on("click", '.filter-action-list-wrapper', function () {
    //     jQuery(this).removeClass("active");
    //     jQuery(".filter-action-list").removeClass("active");
    // });


    /* Field Collections : Edit Field Collection */
    jQuery(document).on("click", ".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item .ufc-field-list-item-actions .ufc-field-list-item-edit-action", function (e) {
        jQuery(this).parents(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item").trigger("click");
    });

    /* Field Collections : Delete Field Collection */
    jQuery(document).on("click", ".ufc-field-list-item-delete-action, .ufc-settings-actions-delete-action", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }

        ufcFormUnsaved = false;

        if (confirm(ufcDeleteConfirmationMessage) == false) {
            return false;
        }

        var $this = jQuery(this).parents('.ultimate-field-collections-sidebar');
        var star_query = jQuery('.ultimate-field-collections-sidebar.ufc-field-data-section-sidebar').attr('data-star-query');
        if (jQuery(this).hasClass("ufc-field-list-item-delete-action")) {
            var field_group_el = jQuery(this).closest(".ufc-filter-result-item");
        } else if (jQuery(this).hasClass("ufc-settings-actions-delete-action")) {
            var field_group_el = jQuery("li.ufc-field-list-item.ufc-select-field-group");
        }

        var field_group_id = field_group_el.attr("data-field_group_id");
        var is_post = 0;
        if (field_group_el.attr('data-field_post_id')) {
            field_group_id = field_group_el.attr("data-field_post_id");
            is_post = 1;
        }
        var field_group_key = field_group_el.attr("data-field_group_key");


        $this.find("ul.ufc-filter-result > li.ufc-filter-result-item").removeClass("ufc-select-field-group");

        jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
        var ufc_field_group_data = {
            action: "ufc_delete_field_group",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
            ufc_field_group_id: field_group_id,
            ufc_field_group_key: field_group_key,
            is_post: is_post,
            star_query: star_query
        };

        jQuery.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_field_group_data,
            success: function (response) {
                response = JSON.parse(response);
                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                if (response.field_trash) {
                    field_group_el.attr('data-status', 'trash').addClass('hide');
                } else if (response.field_delete) {
                    field_group_el.remove();
                }

                if (response.ufc_field_group_starred_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .starred .count").html(response.ufc_field_group_starred_count);
                }
                if (response.ufc_field_group_all_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .all .count").html(response.ufc_field_group_all_count);
                }
                if (response.ufc_field_group_active_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .publish .count").html(response.ufc_field_group_active_count);
                }
                if (response.ufc_field_group_disabled_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .acf-disabled .count").html(response.ufc_field_group_disabled_count);
                }
                if (response.ufc_field_group_private_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .private .count").html(response.ufc_field_group_private_count);
                }
                if (response.ufc_field_group_draft_count) {
                    if (response.ufc_field_group_draft_count == '(0)') {
                        $this.find(".ufc-field-list-header-item.ufc-list-filters .draft").addClass("count_zero");
                    }
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .draft .count").html(response.ufc_field_group_draft_count);
                }
                if (response.ufc_field_group_trash_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .trash").removeClass("count_zero");
                    if (response.ufc_field_group_trash_count == '(0)') {
                        $this.find(".ufc-field-list-header-item.ufc-list-filters .trash").addClass("count_zero");
                    }
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .trash .count").html(response.ufc_field_group_trash_count);
                }

            },
        });
    });

    /* Field Collections : Restore Field Collection from Trash */
    jQuery(document).on("click", ".ufc-field-list-item-trash-restore-action", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }
        ufcFormUnsaved = false;

        if (confirm(ufcRestoreConfirmationMessage) == false) {
            return false;
        }

        var $this = jQuery(this).parents('.ultimate-field-collections-sidebar');
        var field_group_el = jQuery(this).closest(".ufc-filter-result-item");

        var star_query = jQuery('.ultimate-field-collections-sidebar.ufc-field-data-section-sidebar').attr('data-star-query');
        var field_group_id = field_group_el.attr("data-field_group_id");
        var is_post = 0;
        if (field_group_el.attr('data-field_post_id')) {
            field_group_id = field_group_el.attr("data-field_post_id");
            is_post = 1;
        }
        var field_group_key = field_group_el.attr("data-field_group_key");


        $this.find("ul.ufc-filter-result > li.ufc-filter-result-item").removeClass("ufc-select-field-group");

        jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
        var ufc_field_group_data = {
            action: "ufc_trash_restore_field_group",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
            ufc_field_group_id: field_group_id,
            ufc_field_group_key: field_group_key,
            is_post: is_post,
            star_query: star_query,
        };

        jQuery.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_field_group_data,
            success: function (response) {
                response = JSON.parse(response);
                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                if (response.field_post_status) {
                    field_group_el.attr('data-status', response.field_post_status);
                }
                if (response.field_restore) {
                    field_group_el.addClass('hide');
                }

                if (response.ufc_field_group_starred_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .starred .count").html(response.ufc_field_group_starred_count);
                }
                if (response.ufc_field_group_all_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .all .count").html(response.ufc_field_group_all_count);
                }
                if (response.ufc_field_group_active_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .publish .count").html(response.ufc_field_group_active_count);
                }
                if (response.ufc_field_group_disabled_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .acf-disabled .count").html(response.ufc_field_group_disabled_count);
                }
                if (response.ufc_field_group_private_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .private .count").html(response.ufc_field_group_private_count);
                }
                if (response.ufc_field_group_draft_count) {
                    if (response.ufc_field_group_draft_count != '(0)') {
                        $this.find(".ufc-field-list-header-item.ufc-list-filters .draft").removeClass("count_zero");
                    }
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .draft .count").html(response.ufc_field_group_draft_count);
                }
                if (response.ufc_field_group_trash_count) {
                    if (response.ufc_field_group_trash_count == '(0)') {
                        $this.find(".ufc-field-list-header-item.ufc-list-filters .trash").addClass("count_zero");
                    }
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .trash .count").html(response.ufc_field_group_trash_count);
                }

            },
        });
    });

    /* Field Collections : Duplicate Field Collection */
    jQuery(document).on("click", ".ufc-field-list-item-duplicate-action, .ufc-settings-actions-duplicate-action", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }

        ufcFormUnsaved = false;

        if (jQuery(this).hasClass("ufc-field-list-item-duplicate-action")) {
            var field_group_el = jQuery(this).closest(".ufc-filter-result-item");
        } else if (jQuery(this).hasClass("ufc-settings-actions-duplicate-action")) {
            var field_group_el = jQuery('li.ufc-filter-result-item.ufc-select-field-group');
        }

        var $this = jQuery(this).parents('.ultimate-field-collections-sidebar');
        var star_query = jQuery('.ultimate-field-collections-sidebar.ufc-field-data-section-sidebar').attr('data-star-query');

        var is_post = 0;
        var post_id = '';
        if (field_group_el.attr('data-field_post_id')) {
            post_id = field_group_el.attr("data-field_post_id");
            is_post = 1;
        }

        var field_group_id = field_group_el.attr("data-field_group_id");
        var field_group_key = field_group_el.attr("data-field_group_key");

        $this.find("ul.ufc-filter-result > li.ufc-filter-result-item").removeClass("ufc-select-field-group");

        jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
        var ufc_field_group_data = {
            action: "ufc_duplicate_field_group",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
            ufc_field_group_id: field_group_id,
            ufc_field_group_key: field_group_key,
            post_id: post_id,
            is_post: is_post,
            star_query: star_query,
        };

        jQuery.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_field_group_data,
            success: function (response) {
                response = JSON.parse(response);
                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");

                if (response.field_duplicate) {
                    jQuery(response.duplicated_field_group_html).insertAfter(field_group_el);
                }

                if (response.ufc_field_group_starred_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .starred .count").html(response.ufc_field_group_starred_count);
                }
                if (response.ufc_field_group_all_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .all .count").html(response.ufc_field_group_all_count);
                }
                if (response.ufc_field_group_active_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .publish .count").html(response.ufc_field_group_active_count);
                }
                if (response.ufc_field_group_disabled_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .acf-disabled .count").html(response.ufc_field_group_disabled_count);
                }
                if (response.ufc_field_group_private_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .private .count").html(response.ufc_field_group_private_count);
                }
                if (response.ufc_field_group_draft_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .draft .count").html(response.ufc_field_group_draft_count);
                }
                if (response.ufc_field_group_trash_count) {
                    $this.find(".ufc-field-list-header-item.ufc-list-filters .trash .count").html(response.ufc_field_group_trash_count);
                }

            },
        });

    });

    /* Field Collections : Field Label update on header line */
    jQuery(document).on("change, keydown, keyup, focusout", ".ufc-group-custom-fields .field-edit-view-wrap .field-edit-content-main input.ufc-field-input[name$='[label]']", function (e) {
        e.preventDefault();

        jQuery(this).closest(".field-edit-view-wrap").find(".edit-field-header .edit-field-name-header").first().html(jQuery(this).val());

        if (jQuery(this).val().length == 0) {
            if (jQuery(this).closest(".field-edit-view-wrap").hasClass("field-type-tab") || jQuery(this).closest(".field-edit-view-wrap").hasClass("field-type-accordion")) {
                jQuery(this).closest(".field-edit-view-wrap").find(".edit-field-header .edit-field-name-header").first().html("(no label)");
            }
        }
    });

    jQuery(document).on("keyup", ".ufc-group-custom-fields .field-edit-view-wrap .field-edit-content-main input.ufc-field-input[name$='[name]']", function (e) {
        e.preventDefault();
        var original_val = jQuery(this).val();
        var filtered_val = original_val
            .toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "_");
        jQuery(this).val(filtered_val);
    });

    jQuery(document).on("change, focusout", ".ufc-group-custom-fields .field-edit-view-wrap .field-edit-content-main input.ufc-field-input[name$='[label]']", function (e) {
        e.preventDefault();
        var label_val = jQuery(this).val();
        var name_val = jQuery(this).closest(".field-edit-content-main").find("input[name$='[name]']").first().val();
        if (name_val.length == 0) {
            var new_name_val = label_val
                .toLowerCase()
                .replace(/[^\w ]+/g, "")
                .replace(/ +/g, "_");
            jQuery(this).closest(".field-edit-content-main").find("input[name$='[name]']").first().val(new_name_val);
        }
    });

    /* Tab group, Accordion group, Video group : Label Update */
    jQuery(document).on("change, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group > .field-edit-content-main > .field-edit-content-row input.ufc-field-input[name$='[label]']", function (e) {
        var group_label_val = jQuery(this).val();
        var group_name_val = jQuery(this).closest(".field-edit-content-main").find("input[name$='[name]']").first().val();
        if (group_label_val.length) {
            if (group_name_val.length == 0) {
                var group_name_val = group_label_val
                    .toLowerCase()
                    .replace(/[^\w ]+/g, "")
                    .replace(/ +/g, "_");
            }
            /*if ( group_name_val.endsWith("_group") == false ) {
                group_name_val = group_name_val + '_group';
            }*/
            jQuery(this).closest(".field-edit-content-main").find("input[name$='[name]']").first().val(group_name_val);

            if (jQuery(this).closest(".field-type-group").children("input[name$='[ufc_field_video_group]']")) {

                jQuery(this).closest(".field-type-group")
                    .find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input.ufc-field-input[name$='[label]']")
                    .val(group_label_val + ' File');
                jQuery(this).closest(".field-type-group")
                    .find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input.ufc-field-input[name$='[name]']")
                    .val(group_name_val + '_file');

                jQuery(this).closest(".field-type-group")
                    .find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input.ufc-field-input[name$='[label]']")
                    .val(group_label_val + ' oEmbed');

                jQuery(this).closest(".field-type-group")
                    .find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input.ufc-field-input[name$='[name]']")
                    .val(group_name_val + '_oembed');
            }
        }
    });

    /* Tab group, Accordion group, Video group : Name Update */
    jQuery(document).on("change, focusout", ".ufc-group-custom-fields .field-edit-view-wrap.field-type-group > .field-edit-content-main > .field-edit-content-row input.ufc-field-input[name$='[name]']", function (e) {
        var group_name_val = jQuery(this).val();
        var group_label_val = jQuery(this).closest(".field-edit-content-main").find("input[name$='[label]']").first().val();

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

        if (group_name_val.length) {

            jQuery(this).closest(".field-edit-content-main").find("input[name$='[name]']").first().val(group_name_val);

            if (jQuery(this).closest(".field-type-group").children("input[name$='[ufc_field_video_group]']")) {

                jQuery(this).closest(".field-type-group")
                    .find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-file input.ufc-field-input[name$='[name]']")
                    .val(group_name_val + '_file');

                jQuery(this).closest(".field-type-group")
                    .find(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap.field-type-oembed input.ufc-field-input[name$='[name]']")
                    .val(group_name_val + '_oembed');
            }
        }
    });

    /* Field Collections : Change checkbox of required from relationship and post_object type */
    jQuery(document).on("change", ".ufc-tab-content .ufc-group-custom-fields .field-edit-view-wrap.field-type-relationship .field_required_input_wrap .ufc-field-checkbox, .ufc-tab-content .ufc-group-custom-fields .field-edit-view-wrap.field-type-post_object .field_required_input_wrap .ufc-field-checkbox", function (e) {
        if (jQuery(this).prop("checked")) {
            jQuery(this).closest(".field-edit-content-main").find(".field_hide_allow_null_wrap .ufc-field-checkbox").attr("checked", false);
        } else {
            jQuery(this).closest(".field-edit-content-main").find(".field_hide_allow_null_wrap .ufc-field-checkbox").attr("checked", true);
        }
    });

    /* Field Collections : Change Allow Archive checkbox value */
    jQuery(document).on("change", ".field_allow_archive_wrap input[type='checkbox']", function (e) {
        if (jQuery(this).prop("checked")) {
            jQuery(this).parents('.field_allow_archive_wrap').find('input[type=hidden]').val(1);
        } else {
            jQuery(this).parents('.field_allow_archive_wrap').find('input[type=hidden]').val(0);
        }
    });

    /* Field Collections : Change checkbox of Date Time Picker */
    jQuery(document).on("change", ".ultimate-field-collections-content .ufc-tab-content .ufc-field-checkbox-switch .ufc_date_time_picker_checkbox, .ultimate-field-collections-content .ufc-tab-content .ufc-field-checkbox-switch .ufc_date_picker_checkbox", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var checkbox_time_picker = jQuery(this).closest(".field-edit-content-main").find("input[name$='[time_picker]']").first();
        var checkbox_date_picker = jQuery(this).closest(".field-edit-content-main").find("input[name$='[date_picker]']").first();

        if ((checkbox_time_picker.prop("checked") == true) && (checkbox_date_picker.prop("checked") == true)) {
            var field_picker_type = 'date_time_picker';
            var field_picker_display_format = 'd/m/Y g:i a';

        } else if (checkbox_time_picker.prop("checked") == true) {
            var field_picker_type = 'time_picker';
            var field_picker_display_format = 'g:i a';

        } else if (checkbox_date_picker.prop("checked") == true) {
            var field_picker_type = 'date_picker';
            var field_picker_display_format = 'd/m/Y';
        }

        if ((checkbox_time_picker.prop("checked") == false) && (checkbox_date_picker.prop("checked") == false)) {

            if (jQuery(this).hasClass('ufc_date_time_picker_checkbox')) {
                checkbox_date_picker.prop("checked", true);

            } else if (jQuery(this).hasClass('ufc_date_picker_checkbox')) {
                checkbox_time_picker.prop("checked", true);
            }

        } else {

            jQuery(this).closest(".field-edit-view-wrap").find("input[name$='[type]']").first().val(field_picker_type);
            jQuery(this).closest(".field-edit-view-wrap").find("input[name$='[display_format]']").first().val(field_picker_display_format);
            jQuery(this).closest(".field-edit-view-wrap").find("input[name$='[return_format]']").first().val(field_picker_display_format);
        }

        /*if ( jQuery(this).prop('checked')) {
            var field_type_on = jQuery(this).attr('data-field_type_on');
            jQuery(this).closest('.field-edit-view-wrap').find("input[name$='[type]']").first().val(field_type_on);

        } else {
            var field_type_off = jQuery(this).attr('data-field_type_off');
            jQuery(this).closest('.field-edit-view-wrap').find("input[name$='[type]']").first().val(field_type_off);
        }*/
    });

    /* Edited Field Collection : Swich Field Data Tab and get Mached Posts Lists */
    jQuery(document).on("click", ".ufc-content-header-wrap .ufc-content-tabs-wrap .ufc-content-tab", function (e) {
        e.preventDefault();

        var target_tab = jQuery(this).attr("data-target_tab");

        // console.log("active tab:", target_tab);

        if (jQuery(this).hasClass('ufc-active-tab')) {
            return false;
        }

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
            if (target_tab == "field_data") {
                ufcSettingsFormNeedReload = true;
            }
        }

        ufcFormUnsaved = false;

        jQuery(".ufc-content-header-wrap .ufc-content-tabs-wrap .ufc-content-tab").removeClass("ufc-active-tab");
        jQuery(".ultimate-field-collections-content .ufc-tab-content.ufc-active-tab").removeClass("ufc-active-tab");

        var field_group_el = jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item.ufc-select-field-group");
        var field_group_id = field_group_el.attr("data-field_group_id");
        var field_group_key = field_group_el.attr("data-field_group_key");

        if (target_tab === "settings_data") {
            // console.log("fields tab clicked");
            var collection_link = UFC_Admin_Ajax.ufc_admin_page_url;
            collection_link += "&collection=";
            collection_link += field_group_id;
            collection_link += "&tab=fields";
            window.history.pushState('', '', collection_link);

            jQuery(this).addClass("ufc-active-tab");
            jQuery(".ultimate-field-collections-content #ufc_settings_tab_content").addClass("ufc-active-tab");
            jQuery(".ultimate-field-collections-content .ufc-content-header-title .post .post-name").text("").parents(".post").hide();
            jQuery(".ultimate-field-collections-page-wrap").attr(
                {
                    "data-collection_list": "active",
                    "data-collection_settings": "active",
                    "data-post_list": "",
                    "data-post_content": "",
                    "data-create_field_collection": ""
                }
            );
            if (ufcSettingsFormNeedReload) {
                ufcSettingsFormNeedReload = false;
                if (jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item.ufc-select-field-group").length) {
                    jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item.ufc-select-field-group").trigger("click");
                }
            }
            jQuery(".ultimate-field-collections-page-wrap").attr(
                {
                    "data-collection_list": "active",
                    "data-collection_settings": "active",
                    "data-post_list": "",
                    "data-post_content": "",
                    "data-create_field_collection": ""
                }
            );

        } else if (target_tab === "field_data") {

            var collection_link = UFC_Admin_Ajax.ufc_admin_page_url;
            collection_link += "&collection=";
            collection_link += field_group_id;
            collection_link += "&tab=content";
            window.history.pushState('', '', collection_link);

            jQuery(this).addClass("ufc-active-tab");
            jQuery(".ultimate-field-collections-content #ufc_field_data_tab_content").addClass("ufc-active-tab");
            /*jQuery('.ufc-content-header-wrap .ufc-content-btns').hide();*/

            // jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content #ufc_field_data_tab_content").html("");
            jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
            jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");

            if (!jQuery(".ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item.ufc-select-field-group").length) {
                jQuery(".ultimate-field-collections-page-wrap").attr(
                    {
                        "data-collection_list": "active",
                        "data-collection_settings": "",
                        "data-post_list": "active",
                        "data-post_content": "",
                        "data-create_field_collection": ""
                    }
                );
            } else {
                jQuery(".ultimate-field-collections-page-wrap").attr(
                    {
                        "data-collection_list": "active",
                        "data-collection_settings": "",
                        "data-post_list": "active",
                        "data-post_content": "active",
                        "data-create_field_collection": ""
                    }
                );
            }


            //             var ufc_field_group_data = {
            //                 action: "ufc_select_group_field_data",
            //                 nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
            //                 ufc_field_group_id: field_group_id,
            //                 ufc_field_group_key: field_group_key,
            //             };
            // 
            //             $.ajax({
            //                 method: "post",
            //                 url: UFC_Admin_Ajax.ajax_url,
            //                 data: ufc_field_group_data,
            //                 success: function (response) {
            //                     response = JSON.parse(response);
            //                     jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
            //                     if (response.field_group_html) {
            //                         setTimeout(function () {
            //                             if(!jQuery(".ufc-field-data-section-content .postbox").length){
            //                                 jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content #ufc_field_data_tab_content").html(response.field_group_html);
            //                             }
            //                             // if (jQuery(".ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item").length == 1) {
            //                             // 	jQuery("#ufc_field_data_tab_content .ufc-field-data-section-wrap").addClass("no-sidebar");
            //                             // 	jQuery(".ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item").trigger("click");
            //                             // }
            //                         }, 300);
            // 
            //                     }
            //                     jQuery(".ultimate-field-collections-page-wrap").attr(
            //                         {
            //                             "data-collection_list": "active",
            //                             "data-collection_settings": "",
            //                             "data-post_list": "active",
            //                             "data-post_content": "",
            //                             "data-create_field_collection": ""
            //                         }
            //                     );
            //                 },
            //             });
        }
    });

    function ufc_post_fields_js_reload() {

        if (jQuery('.acf-field-color_picker .acf-input .acf-input-wrap input[type="text"]').length) {
            jQuery('.acf-field-color_picker .acf-input .acf-input-wrap input[type="text"]').wpColorPicker({
                change: function (event, ui) {
                    ufcFormUnsaved = true;
                }
            });
        }
        if (jQuery(".acf-field .acf-input .acf-select-wrap select[multiple]").length) {
            jQuery(".acf-field .acf-input .acf-select-wrap select[multiple]").select2();
        }
        if (jQuery(".acf-field .acf-input .acf-select-wrap select.ufc-field-view-select2").length) {
            jQuery(".acf-field .acf-input .acf-select-wrap select.ufc-field-view-select2").select2();
        }

        if (jQuery('.acf-field-date_picker .acf-input .acf-input-wrap input[type="text"]').length) {
            jQuery('.acf-field-date_picker .acf-input .acf-input-wrap input[type="text"]').datepicker({
                dateFormat: "yy-mm-dd",
            });
        }
        if (jQuery('.acf-field-time_picker .acf-input .acf-input-wrap input[type="text"]').length) {
            jQuery('.acf-field-time_picker .acf-input .acf-input-wrap input[type="text"]').timepicker({
                timeFormat: "HH:mm:ss",
            });
        }
        if (jQuery('.acf-field-date_time_picker .acf-input .acf-input-wrap input[type="text"]').length) {
            jQuery('.acf-field-date_time_picker .acf-input .acf-input-wrap input[type="text"]').datetimepicker({
                dateFormat: "yy-mm-dd",
                timeFormat: "HH:mm:ss",
            });
        }

        if (jQuery("form#ufc_field_post_meta_form .acf-field.acf-field-wysiwyg .acf-input-wrap textarea.ufc-editor-area").length) {
            var ucf_field_wysiwyg_Editor = [];
            jQuery("form#ufc_field_post_meta_form .acf-field.acf-field-wysiwyg .acf-input-wrap textarea.ufc-editor-area").each(function (index) {

                console.log('.acf-field.acf-field-wysiwyg');
                console.log(jQuery(this).closest('.acf-field.acf-field-wysiwyg').attr("data-name"));

                if (jQuery(this).closest('.acf-field.acf-field-wysiwyg').attr("data-name") == "editorjs_field") {


                    var wysiwyg_editor_textarea = jQuery(this);
                    var wysiwyg_editor_id = jQuery(this).attr("id");

                    ucf_field_wysiwyg_Editor[wysiwyg_editor_id] = new EditorJS({
                        /**
                         * Enable/Disable the read only mode
                         */
                        readOnly: false,

                        /**
                         * Wrapper of Editor
                         */
                        holder: 'editorjs-' + wysiwyg_editor_id,

                        /**
                         * Common Inline Toolbar settings
                         * - if true (or not specified), the order from 'tool' property will be used
                         * - if an array of tool names, this order will be used
                         */
                        inlineToolbar: ['link', 'marker', 'bold', 'italic'],
                        inlineToolbar: true,

                        /**
                         * Tools list
                         */
                        tools: {
                            /**
                             * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
                             */
                            header: {
                                class: Header,
                                inlineToolbar: ['marker', 'link'],
                                config: {
                                    placeholder: 'Header'
                                },
                                shortcut: 'CMD+SHIFT+H'
                            },

                            list: {
                                class: List,
                                inlineToolbar: true,
                                shortcut: 'CMD+SHIFT+L'
                            },

                            quote: {
                                class: Quote,
                                inlineToolbar: true,
                                config: {
                                    quotePlaceholder: 'Enter a quote',
                                    captionPlaceholder: 'Quote\'s author',
                                },
                                shortcut: 'CMD+SHIFT+O'
                            },

                            marker: {
                                class: Marker,
                                shortcut: 'CMD+SHIFT+M'
                            },

                            code: {
                                class: CodeTool,
                                shortcut: 'CMD+SHIFT+C'
                            },

                            delimiter: Delimiter,

                            inlineCode: {
                                class: InlineCode,
                                shortcut: 'CMD+SHIFT+C'
                            },

                            embed: Embed,

                            /**
                             * Or pass class directly without any configuration
                             */
                            image: SimpleImage,

                            linkTool: LinkTool,

                            warning: Warning,

                            checklist: {
                                class: Checklist,
                                inlineToolbar: true,
                            },

                            table: {
                                class: Table,
                                inlineToolbar: true,
                                shortcut: 'CMD+ALT+T'
                            },

                        },

                        /**
                         * This Tool will be used as default
                         */
                        // defaultBlock: 'paragraph',

                        /**
                         * Initial Editor data
                         */
                        data: {
                            blocks: [
                                // jQuery('#'+wysiwyg_editor_id).val()

                                {
                                    type: "header",
                                    data: {
                                        text: "Editor.js Demo",
                                        level: 2
                                    }
                                },
                                {
                                    type: 'paragraph',
                                    data: {
                                        text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.'
                                    }
                                },



                                {
                                    type: "header",
                                    data: {
                                        text: "Editor.js : Key features",
                                        level: 3
                                    }
                                },
                                {
                                    type: 'list',
                                    data: {
                                        items: [
                                            'It is a block-styled editor',
                                            'It returns clean data output in JSON',
                                            'Designed to be extendable and pluggable with a simple API',
                                        ],
                                        style: 'unordered'
                                    }
                                },



                                {
                                    type: "header",
                                    data: {
                                        text: "What does it mean «block-styled editor»",
                                        level: 3
                                    }
                                },
                                {
                                    type: 'paragraph',
                                    data: {
                                        text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
                                    }
                                },
                                {
                                    type: 'paragraph',
                                    data: {
                                        text: `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`
                                    }
                                },
                                {
                                    type: "header",
                                    data: {
                                        text: "What does it mean clean data output",
                                        level: 3
                                    }
                                },
                                {
                                    type: 'paragraph',
                                    data: {
                                        text: 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
                                    }
                                },
                                {
                                    type: 'paragraph',
                                    data: {
                                        text: `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`
                                    }
                                },
                                {
                                    type: 'paragraph',
                                    data: {
                                        text: 'Clean data is useful to sanitize, validate and process on the backend.'
                                    }
                                },
                                {
                                    type: 'delimiter',
                                    data: {}
                                },
                                {
                                    type: 'paragraph',
                                    data: {
                                        text: 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make its core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏'
                                    }
                                },
                                {
                                    type: 'image',
                                    data: {
                                        url: 'https://dev1.wpufc.com/wp-content/uploads/2022/12/Mount-Tamalpais-State-Park-California.jpg',
                                        caption: '',
                                        stretched: false,
                                        withBorder: true,
                                        withBackground: false,
                                    }
                                },


                            ]
                        },
                        onReady: function () {
                        },
                        onChange: function (api, event) {
                            console.log('something changed', event);
                            console.log('api', api);

                            ucf_field_wysiwyg_Editor[wysiwyg_editor_id].save()
                                .then((savedData) => {
                                    cPreview.show(savedData, document.getElementById('editorjs-' + wysiwyg_editor_id + "-output"));

                                    console.log('savedData');
                                    console.log(savedData);
                                    /*
                                    const edjsParser = edjsHTML();
                                    let savedData_html = edjsParser.parse(savedData);
                                    console.log(savedData_html);

                                    var editor_html_export = '';
                                    if (savedData_html.length) {
                                        jQuery.each(savedData_html, function (key, html_ele_value) {
                                            // alert( key + ": " + value );

                                            if (jQuery.type(html_ele_value) === "string") {
                                                console.log('html_ele_value = ' + html_ele_value);
                                                editor_html_export += html_ele_value;
                                            } else {
                                                console.log('html_ele_value = ERROR');
                                                console.log(html_ele_value);
                                            }
                                        });
                                    }
                                    wysiwyg_editor_textarea.val(editor_html_export);
                                    */



                                })
                                .catch((error) => {
                                    console.error('Saving error', error);
                                });
                        }
                    });


                } else {


                    /*
                    * Toolbar Configurator
                    * Reference: https://ckeditor.com/latest/samples/toolbarconfigurator/#basic
                    */
                    var editor = CKEDITOR.replace(jQuery(this).attr("id"), {
                        // Define the toolbar groups as it is a more accessible solution.
                        toolbarGroups: [
                            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                            { name: 'clipboard', groups: ['clipboard', 'undo'] },
                            { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                            { name: 'forms', groups: ['forms'] },
                            { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                            { name: 'links', groups: ['links'] },
                            { name: 'insert', groups: ['insert'] },
                            { name: 'styles', groups: ['styles'] },
                            { name: 'document', groups: ['mode', 'document', 'doctools'] },
                            { name: 'colors', groups: ['colors'] },
                            { name: 'tools', groups: ['tools'] },
                            { name: 'others', groups: ['others'] },
                            { name: 'about', groups: ['about'] }
                        ],
                        // Remove the redundant buttons from toolbar groups defined above.
                        removeButtons: 'Cut,Copy,Paste,PasteText,PasteFromWord,RemoveFormat,SpecialChar,PageBreak,Smiley,HorizontalRule,NewPage,Preview,Print,Save,Templates,Find,Replace,SelectAll,Checkbox,Radio,TextField,Textarea,Select,Button,HiddenField,Form,ImageButton,Subscript,Superscript,CopyFormatting,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,Iframe,Styles,Font,FontSize,TextColor,BGColor,ShowBlocks,Maximize,About'
                    }); /* Reference: https://cdn.ckeditor.com/ */

                    editor.on('change', function () {
                        ufcFormUnsaved = true;
                    });

                }


            });
        }

        if (jQuery(".acf-field-google_map .acf-input .acf-input-wrap .acf-google-map").length) {
            jQuery(".acf-field-google_map .acf-input .acf-input-wrap .acf-google-map").each(function (index) {

                var ufc_map_section_wrap_id = jQuery(this).attr("id");
                var ufc_map_field_input_id = jQuery(this).find(".ufc-map-field-input").attr("id");
                var ufc_map_field_input_val = jQuery(this).find(".ufc-map-field-input").val();
                var ufc_map_search_input_id = jQuery(this).find(".ufc-map-search-input").attr("id");
                var ufc_map_display_target_id = jQuery(this).find(".ufc-target-map-display").attr("id");

                googleMapLoad(ufc_map_section_wrap_id, ufc_map_field_input_id, ufc_map_search_input_id, ufc_map_display_target_id, ufc_map_field_input_val);
            });
        }

        if (jQuery(".acf-field.acf-field-repeater.ufc-repeater-accordion-view").length) {
            jQuery(".acf-field.acf-field-repeater.ufc-repeater-accordion-view").each(function (index) {
                var ufc_repeater_accordion_main = jQuery(this);
                if (ufc_repeater_accordion_main.find(".ufc-repeater-list-body .acf-row").length) {
                    ufc_repeater_accordion_main.find(".ufc-repeater-list-body").sortable({
                        handle: "span.ufc-accordion-repeater-trigger-reorder",
                        update: function (event, ui) { },
                    });
                }
            });
        }

        if (jQuery(".acf-field.acf-field-repeater.jpn-tabs-activated.jpn-vertical").length) {
            jQuery(".acf-field.acf-field-repeater.jpn-tabs-activated.jpn-vertical").each(function (index) {
                var ufc_repeater_vertical_tab_main = jQuery(this);
                if (ufc_repeater_vertical_tab_main.find(".ufc-repeater-table div.ufc-repeater-list-head ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav").length) {
                    ufc_repeater_vertical_tab_main.find(".ufc-repeater-table div.ufc-repeater-list-head ul.jpn-acf-tabs-nav").sortable({
                        update: function (event, ui) {
                            var dragged_Element = ui.item;
                            if (dragged_Element.length) {
                                var dragged_target_id = dragged_Element.attr("data-target_id");
                                var repeater_table_body = dragged_Element.closest(".ufc-repeater-table").find(".ufc-repeater-list-body").first();
                                if (dragged_Element.prev("li.jpn-acf-tab-nav").length) {
                                    var prev_target_id = dragged_Element.prev("li.jpn-acf-tab-nav").attr("data-target_id");

                                    if (repeater_table_body.find('div.acf-row[data-id="' + dragged_target_id + '"]').length && repeater_table_body.find('div.acf-row[data-id="' + prev_target_id + '"]').length) {
                                        repeater_table_body.find('div.acf-row[data-id="' + dragged_target_id + '"]').insertAfter(repeater_table_body.find('div.acf-row[data-id="' + prev_target_id + '"]'));
                                    }
                                } else if (dragged_Element.next("li.jpn-acf-tab-nav").length) {
                                    var next_target_id = dragged_Element.next("li.jpn-acf-tab-nav").attr("data-target_id");

                                    if (repeater_table_body.find('div.acf-row[data-id="' + dragged_target_id + '"]').length && repeater_table_body.find('div.acf-row[data-id="' + next_target_id + '"]').length) {
                                        repeater_table_body.find('div.acf-row[data-id="' + dragged_target_id + '"]').insertBefore(repeater_table_body.find('div.acf-row[data-id="' + next_target_id + '"]'));
                                    }
                                }
                            }
                        },
                    });
                }
            });
        }

        if (jQuery(".acf-field.acf-field-repeater.jpn-tabs-activated.jpn-horizontal").length) {
            jQuery(".acf-field.acf-field-repeater.jpn-tabs-activated.jpn-horizontal").each(function (index) {
                var ufc_repeater_horizontal_tab_main = jQuery(this);
                if (ufc_repeater_horizontal_tab_main.find(".ufc-repeater-table div.ufc-repeater-list-head ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav").length) {
                    ufc_repeater_horizontal_tab_main.find(".ufc-repeater-table div.ufc-repeater-list-head ul.jpn-acf-tabs-nav").sortable({
                        update: function (event, ui) {
                            var dragged_Element = ui.item;
                            if (dragged_Element.length) {
                                var dragged_target_id = dragged_Element.attr("data-target_id");
                                var repeater_table_body = dragged_Element.closest(".ufc-repeater-table").find(".ufc-repeater-list-body").first();
                                if (dragged_Element.prev("li.jpn-acf-tab-nav").length) {
                                    var prev_target_id = dragged_Element.prev("li.jpn-acf-tab-nav").attr("data-target_id");

                                    if (repeater_table_body.find('div.acf-row[data-id="' + dragged_target_id + '"]').length && repeater_table_body.find('div.acf-row[data-id="' + prev_target_id + '"]').length) {
                                        repeater_table_body.find('div.acf-row[data-id="' + dragged_target_id + '"]').insertAfter(repeater_table_body.find('div.acf-row[data-id="' + prev_target_id + '"]'));
                                    }
                                } else if (dragged_Element.next("li.jpn-acf-tab-nav").length) {
                                    var next_target_id = dragged_Element.next("li.jpn-acf-tab-nav").attr("data-target_id");

                                    if (repeater_table_body.find('div.acf-row[data-id="' + dragged_target_id + '"]').length && repeater_table_body.find('div.acf-row[data-id="' + next_target_id + '"]').length) {
                                        repeater_table_body.find('div.acf-row[data-id="' + dragged_target_id + '"]').insertBefore(repeater_table_body.find('div.acf-row[data-id="' + next_target_id + '"]'));
                                    }
                                }
                            }
                        },
                    });
                }
            });
        }

        if (jQuery(".acf-field.acf-field-gallery").length) {
            jQuery(".acf-field.acf-field-gallery").each(function (index) {
                var ufc_gallery_main = jQuery(this);
                if (ufc_gallery_main.find(".acf-edit-gallery-content-main div.acf-gallery-attachments .acf-gallery-attachment").length) {
                    ufc_gallery_main.find(".acf-edit-gallery-content-main div.acf-gallery-attachments").sortable({
                        update: function (event, ui) {
                            var dragged_Element = ui.item;
                        },
                    });
                }
            });
        }

    }


    function ufc_post_fields_accordion_tab_restructured() {

        /* Conver the Accordion for First Lavel */
        if (jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-field.acf-field-accordion").length) {

            var started_accordions = false;
            var started_active_accordion_wrap = false;
            var ended_accordions_loop = false;

            jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-field").each(function (index) {

                if (jQuery(this).hasClass('acf-field-accordion')) {
                    started_accordions = true;
                    started_active_accordion_wrap = jQuery(this);

                    if (jQuery(this).hasClass('is_accordion_endpoint')) {
                        if (jQuery.trim(jQuery(this).children('.acf-label.acf-accordion-title').children('label').html()).length == 0) {

                            jQuery(this).hide();
                            started_accordions = false;
                            started_active_accordion_wrap = false;
                        }
                    }
                }
                if (started_accordions) {
                    if (jQuery(this).hasClass('acf-field-accordion')) {

                    } else {
                        jQuery(this).detach().appendTo(started_active_accordion_wrap.children('.acf-input.acf-accordion-content').children('.acf-fields'));
                    }
                }
            });
        }

        /* Conver the Accordion for Inner Lavel into Group */
        if (jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-group .ufc-group-list-body .ufc-group-sub-fields-wrap > .acf-field.acf-field-accordion").length) {

            jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-group").each(function (index) {

                var acf_field_group_wrap = jQuery(this);
                var ufc_group_subfields_wrap = acf_field_group_wrap.children('.acf-input').children('.acf-input-wrap').children('.ufc-group-table').children('.ufc-group-list-body').children('.acf-row').children('.acf-fields').children('.ufc-group-sub-fields-main').children('.ufc-group-sub-fields-wrap');


                if (ufc_group_subfields_wrap.children('.acf-field.acf-field-accordion').length) {

                    var started_accordions = false;
                    var started_active_accordion_wrap = false;

                    ufc_group_subfields_wrap.children(".acf-field").each(function (index) {

                        if (jQuery(this).hasClass('acf-field-accordion')) {
                            started_accordions = true;
                            started_active_accordion_wrap = jQuery(this);

                            if (jQuery(this).hasClass('is_accordion_endpoint')) {
                                if (jQuery.trim(jQuery(this).children('.acf-label.acf-accordion-title').children('label').html()).length == 0) {

                                    jQuery(this).hide();
                                    started_accordions = false;
                                    started_active_accordion_wrap = false;
                                }
                            }
                        }
                        if (started_accordions) {
                            if (jQuery(this).hasClass('acf-field-accordion')) {

                            } else {
                                jQuery(this).detach().appendTo(started_active_accordion_wrap.children('.acf-input.acf-accordion-content').children('.acf-fields'));
                            }
                        }
                    });
                }
            });
        }

        /* Conver the Accordion for Inner Lavel into Accordion-Repeater  */
        if (jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-repeater .ufc-repeater-sub-fields-wrap > .acf-field.acf-field-accordion").length) {

            jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-repeater .acf-row .ufc-repeater-sub-fields-wrap").each(function (index) {

                var ucf_field_repeater_row_sub_fields_wrap = jQuery(this);

                if (ucf_field_repeater_row_sub_fields_wrap.children('.acf-field.acf-field-accordion').length) {

                    var started_accordions = false;
                    var started_active_accordion_wrap = false;

                    ucf_field_repeater_row_sub_fields_wrap.children(".acf-field").each(function (index) {

                        if (jQuery(this).hasClass('acf-field-accordion')) {
                            started_accordions = true;
                            started_active_accordion_wrap = jQuery(this);

                            if (jQuery(this).hasClass('is_accordion_endpoint')) {
                                if (jQuery.trim(jQuery(this).children('.acf-label.acf-accordion-title').children('label').html()).length == 0) {

                                    jQuery(this).hide();
                                    started_accordions = false;
                                    started_active_accordion_wrap = false;
                                }
                            }
                        }
                        if (started_accordions) {
                            if (jQuery(this).hasClass('acf-field-accordion')) {

                            } else {
                                jQuery(this).detach().appendTo(started_active_accordion_wrap.children('.acf-input.acf-accordion-content').children('.acf-fields'));
                            }
                        }
                    });
                }
            });
        }


        /* Conver the Tab for First Lavel */
        if (jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-field.acf-field-tab").length) {

            if (!jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-field.acf-field-tab").first().hasClass('is_tab_endpoint')) {
                jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-field.acf-field-tab").first().before('<div class="acf-tab-wrap"><ul class="acf-hl acf-tab-group"></ul><div class="acf-tab-content-wrap"></div></div>');
            }
            if (jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-field.acf-field-tab.is_tab_endpoint").length) {
                jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-field.acf-field-tab.is_tab_endpoint").before('<div class="acf-tab-wrap"><ul class="acf-hl acf-tab-group"></ul><div class="acf-tab-content-wrap"></div></div>');
            }

            var acf_tab_wrap = jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-tab-wrap").first();

            jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-field.acf-field-tab").each(function (index) {
                var ufc_tab_main = jQuery(this);
                if (ufc_tab_main.hasClass('is_tab_endpoint')) {
                    if (jQuery.trim(ufc_tab_main.find(".acf-input .acf-tab-wrap a.acf-tab-button").html()).length == 0) {
                        ufc_tab_main.prev('.acf-tab-wrap').remove();
                    } else {
                        acf_tab_wrap = ufc_tab_main.prev('.acf-tab-wrap');
                    }
                    // } else if ( ufc_tab_main.prev('.acf-tab-wrap').length ) {
                    //     acf_tab_wrap = ufc_tab_main.prev('.acf-tab-wrap');
                }

                if (ufc_tab_main.find(".acf-input .acf-tab-wrap").length) {

                    if (ufc_tab_main.hasClass('is_tab_endpoint')) {
                        if (jQuery.trim(ufc_tab_main.find(".acf-input .acf-tab-wrap a.acf-tab-button").html()).length == 0) {
                            return false;
                        }
                    }

                    var new_tab_html = '<li>';
                    new_tab_html += ufc_tab_main.find(".acf-input .acf-tab-wrap").html();
                    new_tab_html += '</li>';
                    acf_tab_wrap.find("ul.acf-tab-group").append(new_tab_html);
                }
            });


            var started_tabs = false;
            var started_active_tab_wrap = false;
            var started_active_tab_wrap = false;
            var ended_tabs_loop = false;

            jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-field").each(function (index) {

                if (jQuery(this).hasClass('acf-field-tab')) {
                    started_tabs = true;
                    if (jQuery(this).prev().hasClass('acf-tab-wrap')) {
                        started_active_tab_wrap = jQuery(this).prev('.acf-tab-wrap');
                    }

                    if (jQuery(this).hasClass('is_tab_endpoint')) {
                        if (jQuery.trim(jQuery(this).children('.acf-label.acf-tab-title').children('label').html()).length == 0) {

                            jQuery(this).hide();
                            started_tabs = false;
                            started_active_tab_wrap = false;
                        }
                    }
                }
                if (started_tabs && (started_active_tab_wrap != false)) {
                    jQuery(this).detach().appendTo(started_active_tab_wrap.children('.acf-tab-content-wrap'));
                }
            });

        }

        /* Conver the Tab for Inner Lavel into Group */
        if (jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-group .ufc-group-list-body .ufc-group-sub-fields-wrap > .acf-field.acf-field-tab").length) {

            jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-group").each(function (index) {

                var ucf_field_group_main = jQuery(this);
                var ufc_group_sub_fields_wrap = ucf_field_group_main.children(".acf-input").children(".acf-input-wrap").children(".ufc-group-table").children(".ufc-group-list-body").children(".acf-row").children(".acf-fields").children(".ufc-group-sub-fields-main").children(".ufc-group-sub-fields-wrap");

                if (ufc_group_sub_fields_wrap.children(".acf-field.acf-field-tab").length) {

                    if (ufc_group_sub_fields_wrap.children(".acf-field.acf-field-tab").first()) {
                        ufc_group_sub_fields_wrap.children(".acf-field.acf-field-tab").first().before('<div class="acf-tab-wrap"><ul class="acf-hl acf-tab-group"></ul><div class="acf-tab-content-wrap"></div></div>');
                    }

                    if (ufc_group_sub_fields_wrap.children(".acf-field.acf-field-tab.is_tab_endpoint")) {
                        ufc_group_sub_fields_wrap.children(".acf-field.acf-field-tab.is_tab_endpoint").before('<div class="acf-tab-wrap"><ul class="acf-hl acf-tab-group"></ul><div class="acf-tab-content-wrap"></div></div>');
                    }

                    var acf_tab_wrap = ufc_group_sub_fields_wrap.children(".acf-tab-wrap").first();

                    ufc_group_sub_fields_wrap.children(".acf-field.acf-field-tab").each(function (index) {
                        var ufc_tab_main = jQuery(this);
                        if (ufc_tab_main.hasClass('is_tab_endpoint')) {
                            if (jQuery.trim(ufc_tab_main.find(".acf-input .acf-tab-wrap a.acf-tab-button").html()).length == 0) {
                                ufc_tab_main.prev('.acf-tab-wrap').remove();
                            } else {
                                acf_tab_wrap = ufc_tab_main.prev('.acf-tab-wrap');
                            }
                        }
                        if (ufc_tab_main.find(".acf-input .acf-tab-wrap").length) {

                            if (ufc_tab_main.hasClass('is_tab_endpoint')) {
                                if (jQuery.trim(ufc_tab_main.find(".acf-input .acf-tab-wrap a.acf-tab-button").html()).length == 0) {
                                    return false;
                                }
                            }

                            var new_tab_html = '<li>';
                            new_tab_html += ufc_tab_main.find(".acf-input .acf-tab-wrap").html();
                            new_tab_html += '</li>';
                            acf_tab_wrap.children("ul.acf-tab-group").first().append(new_tab_html);
                        }
                    });


                    var started_tabs = false;
                    var started_active_tab_wrap = false;
                    var started_active_tab_wrap = false;
                    var ended_tabs_loop = false;

                    ufc_group_sub_fields_wrap.children(".acf-field").each(function (index) {

                        if (jQuery(this).hasClass('acf-field-tab')) {
                            started_tabs = true;
                            if (jQuery(this).prev().hasClass('acf-tab-wrap')) {
                                started_active_tab_wrap = jQuery(this).prev('.acf-tab-wrap');
                            }

                            if (jQuery(this).hasClass('is_tab_endpoint')) {
                                if (jQuery.trim(jQuery(this).children('.acf-label.acf-tab-title').children('label').html()).length == 0) {

                                    jQuery(this).hide();
                                    started_tabs = false;
                                    started_active_tab_wrap = false;
                                }
                            }
                        }
                        if (started_tabs && (started_active_tab_wrap != false)) {
                            jQuery(this).detach().appendTo(started_active_tab_wrap.children('.acf-tab-content-wrap'));
                        }
                    });

                }
            });
        }

        /* Conver the Tab for Inner Lavel into Accordion-Repeater */
        if (jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-repeater .ufc-repeater-sub-fields-wrap > .acf-field.acf-field-tab").length) {

            jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-repeater .acf-row .ufc-repeater-sub-fields-wrap").each(function (index) {
                var ucf_field_repeater_row_sub_fields_wrap = jQuery(this);
                if (ucf_field_repeater_row_sub_fields_wrap.children(".acf-field.acf-field-tab").length) {

                    if (!ucf_field_repeater_row_sub_fields_wrap.children(".acf-field.acf-field-tab").first().hasClass('is_tab_endpoint')) {
                        ucf_field_repeater_row_sub_fields_wrap.children(".acf-field.acf-field-tab").first().before('<div class="acf-tab-wrap"><ul class="acf-hl acf-tab-group"></ul><div class="acf-tab-content-wrap"></div></div>');
                    }

                    if (ucf_field_repeater_row_sub_fields_wrap.children(".acf-field.acf-field-tab.is_tab_endpoint")) {
                        ucf_field_repeater_row_sub_fields_wrap.children(".acf-field.acf-field-tab.is_tab_endpoint").before('<div class="acf-tab-wrap"><ul class="acf-hl acf-tab-group"></ul><div class="acf-tab-content-wrap"></div></div>');
                    }

                    var acf_tab_wrap = ucf_field_repeater_row_sub_fields_wrap.children(".acf-tab-wrap").first();

                    ucf_field_repeater_row_sub_fields_wrap.children(".acf-field.acf-field-tab").each(function (index) {
                        var ufc_tab_main = jQuery(this);
                        if (ufc_tab_main.hasClass('is_tab_endpoint')) {
                            if (jQuery.trim(ufc_tab_main.find(".acf-input .acf-tab-wrap a.acf-tab-button").html()).length == 0) {
                                ufc_tab_main.prev('.acf-tab-wrap').remove();
                            } else {
                                acf_tab_wrap = ufc_tab_main.prev('.acf-tab-wrap');
                            }
                        }
                        if (ufc_tab_main.find(".acf-input .acf-tab-wrap").length) {

                            if (ufc_tab_main.hasClass('is_tab_endpoint')) {
                                if (jQuery.trim(ufc_tab_main.find(".acf-input .acf-tab-wrap a.acf-tab-button").html()).length == 0) {
                                    return false;
                                }
                            }

                            var new_tab_html = '<li>';
                            new_tab_html += ufc_tab_main.find(".acf-input .acf-tab-wrap").html();
                            new_tab_html += '</li>';
                            acf_tab_wrap.children("ul.acf-tab-group").first().append(new_tab_html);
                        }
                    });


                    var started_tabs = false;
                    var started_active_tab_wrap = false;
                    var started_active_tab_wrap = false;
                    var ended_tabs_loop = false;

                    ucf_field_repeater_row_sub_fields_wrap.children(".acf-field").each(function (index) {

                        if (jQuery(this).hasClass('acf-field-tab')) {
                            started_tabs = true;
                            if (jQuery(this).prev().hasClass('acf-tab-wrap')) {
                                started_active_tab_wrap = jQuery(this).prev('.acf-tab-wrap');
                            }

                            if (jQuery(this).hasClass('is_tab_endpoint')) {
                                if (jQuery.trim(jQuery(this).children('.acf-label.acf-tab-title').children('label').html()).length == 0) {

                                    jQuery(this).hide();
                                    started_tabs = false;
                                    started_active_tab_wrap = false;
                                }
                            }
                        }
                        if (started_tabs && (started_active_tab_wrap != false)) {
                            jQuery(this).detach().appendTo(started_active_tab_wrap.children('.acf-tab-content-wrap'));
                        }
                    });

                }
            });
        }

        /* Conver the Tab for Inner Lavel into Accordion */
        if (jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-accordion .acf-input.acf-accordion-content .acf-fields.ufc-accordion-sub-fields-wrap > .acf-field.acf-field-tab").length) {

            jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-accordion").each(function (index) {
                var ucf_field_accordion_main = jQuery(this);
                if (ucf_field_accordion_main.children(".acf-input.acf-accordion-content").children(".acf-fields.ufc-accordion-sub-fields-wrap").children(".acf-field.acf-field-tab").length) {

                    if (!ucf_field_accordion_main.children(".acf-input.acf-accordion-content").children(".acf-fields.ufc-accordion-sub-fields-wrap").children(".acf-field.acf-field-tab").first().hasClass('is_tab_endpoint')) {
                        ucf_field_accordion_main.children(".acf-input.acf-accordion-content").children(".acf-fields.ufc-accordion-sub-fields-wrap").children(".acf-field.acf-field-tab").first().before('<div class="acf-tab-wrap"><ul class="acf-hl acf-tab-group"></ul><div class="acf-tab-content-wrap"></div></div>');
                    }

                    if (ucf_field_accordion_main.children(".acf-input.acf-accordion-content").children(".acf-fields.ufc-accordion-sub-fields-wrap").children(".acf-field.acf-field-tab.is_tab_endpoint")) {
                        ucf_field_accordion_main.children(".acf-input.acf-accordion-content").children(".acf-fields.ufc-accordion-sub-fields-wrap").children(".acf-field.acf-field-tab.is_tab_endpoint").before('<div class="acf-tab-wrap"><ul class="acf-hl acf-tab-group"></ul><div class="acf-tab-content-wrap"></div></div>');
                    }

                    var acf_tab_wrap = ucf_field_accordion_main.children(".acf-input.acf-accordion-content").children(".acf-fields.ufc-accordion-sub-fields-wrap").children(".acf-tab-wrap").first();

                    ucf_field_accordion_main.children(".acf-input.acf-accordion-content").children(".acf-fields.ufc-accordion-sub-fields-wrap").children(".acf-field.acf-field-tab").each(function (index) {
                        var ufc_tab_main = jQuery(this);
                        if (ufc_tab_main.hasClass('is_tab_endpoint')) {
                            if (jQuery.trim(ufc_tab_main.find(".acf-input .acf-tab-wrap a.acf-tab-button").html()).length == 0) {
                                ufc_tab_main.prev('.acf-tab-wrap').remove();
                            } else {
                                acf_tab_wrap = ufc_tab_main.prev('.acf-tab-wrap');
                            }
                        }
                        if (ufc_tab_main.find(".acf-input .acf-tab-wrap").length) {

                            if (ufc_tab_main.hasClass('is_tab_endpoint')) {
                                if (jQuery.trim(ufc_tab_main.find(".acf-input .acf-tab-wrap a.acf-tab-button").html()).length == 0) {
                                    return false;
                                }
                            }

                            var new_tab_html = '<li>';
                            new_tab_html += ufc_tab_main.find(".acf-input .acf-tab-wrap").html();
                            new_tab_html += '</li>';
                            acf_tab_wrap.children("ul.acf-tab-group").first().append(new_tab_html);
                        }
                    });


                    var started_tabs = false;
                    var started_active_tab_wrap = false;
                    var started_active_tab_wrap = false;
                    var ended_tabs_loop = false;

                    ucf_field_accordion_main.children(".acf-input.acf-accordion-content").children(".acf-fields.ufc-accordion-sub-fields-wrap").children(".acf-field").each(function (index) {

                        if (jQuery(this).hasClass('acf-field-tab')) {
                            started_tabs = true;
                            if (jQuery(this).prev().hasClass('acf-tab-wrap')) {
                                started_active_tab_wrap = jQuery(this).prev('.acf-tab-wrap');
                            }

                            if (jQuery(this).hasClass('is_tab_endpoint')) {
                                if (jQuery.trim(jQuery(this).children('.acf-label.acf-tab-title').children('label').html()).length == 0) {

                                    jQuery(this).hide();
                                    started_tabs = false;
                                    started_active_tab_wrap = false;
                                }
                            }
                        }
                        if (started_tabs && (started_active_tab_wrap != false)) {
                            jQuery(this).detach().appendTo(started_active_tab_wrap.children('.acf-tab-content-wrap'));
                        }
                    });

                }
            });
        }

        /* Select the first Tab */
        if (jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-tab-wrap ul.acf-tab-group").length) {

            jQuery("form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-tab-wrap ul.acf-tab-group").each(function (index) {
                if (jQuery(this).children('li').first().children('a.acf-tab-button').length) {
                    jQuery(this).children('li').first().children('a.acf-tab-button').trigger('click');
                }
            });
        }

    }

    /* Tab selection for First Lavel */
    jQuery(document).on("click", "form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap > .acf-tab-wrap ul.acf-tab-group li > a.acf-tab-button", function (e) {
        e.preventDefault();
        var acf_tab_button = jQuery(this);
        acf_tab_button.closest('ul.acf-tab-group').find('li').removeClass('active');
        acf_tab_button.closest('li').addClass('active');
        var ucf_tab_field_key = acf_tab_button.attr('data-key');
        var started_tabs = false;
        var started_active_tab = false;
        var ended_active_tab = false;
        var ended_tabs_loop = false;

        /*acf_tab_button.closest('.ufc-group-custom-field-content-wrap').children('.acf-field').each(function (index) {*/
        acf_tab_button.closest('.acf-tab-wrap').children('.acf-tab-content-wrap').children('.acf-field').each(function (index) {

            if (ended_tabs_loop) {
                return false;
            }

            if (jQuery(this).hasClass('acf-field-tab')) {

                if ((started_tabs) && jQuery(this).hasClass('is_tab_endpoint')) {
                    ended_tabs_loop = true;
                }

                if (acf_tab_button.closest('.acf-tab-wrap').is(jQuery(this).closest('.acf-tab-wrap'))) {
                    started_tabs = true;
                }

                if (jQuery(this).attr('data-key') == ucf_tab_field_key) {
                    started_active_tab = true;
                } else if (started_active_tab) {
                    ended_active_tab = true;
                }
            }

            if (ended_tabs_loop) {
                return false;
            }

            if (started_tabs) {
                if (ended_active_tab) {
                    jQuery(this).hide();

                } else if (started_active_tab) {
                    if (jQuery(this).hasClass('acf-field-tab') || jQuery(this).hasClass('is_tab_endpoint') || jQuery(this).hasClass('is_accordion_endpoint')) {
                        jQuery(this).hide();
                    } else {
                        jQuery(this).show();
                    }

                } else {
                    jQuery(this).hide();
                }
            }
        });
    });

    /* Tab selection for Inner Lavel into Group */
    jQuery(document).on("click", "form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-group .ufc-group-list-body .ufc-group-sub-fields-wrap > .acf-tab-wrap ul.acf-tab-group li > a.acf-tab-button", function (e) {
        e.preventDefault();
        var acf_tab_button = jQuery(this);
        acf_tab_button.closest('ul.acf-tab-group').find('li').removeClass('active');
        acf_tab_button.closest('li').addClass('active');
        var ucf_tab_field_key = acf_tab_button.attr('data-key');
        var started_tabs = false;
        var started_active_tab = false;
        var ended_active_tab = false;
        var ended_tabs_loop = false;

        /*acf_tab_button.closest('.ufc-group-sub-fields-wrap').children('.acf-field').each(function (index) {*/
        acf_tab_button.closest('.acf-tab-wrap').children('.acf-tab-content-wrap').children('.acf-field').each(function (index) {

            if (ended_tabs_loop) {
                return false;
            }

            if (jQuery(this).hasClass('acf-field-tab')) {

                if ((started_tabs) && jQuery(this).hasClass('is_tab_endpoint')) {
                    ended_tabs_loop = true;
                }

                if (acf_tab_button.closest('.acf-tab-wrap').is(jQuery(this).closest('.acf-tab-wrap'))) {
                    started_tabs = true;
                }

                if (jQuery(this).attr('data-key') == ucf_tab_field_key) {
                    started_active_tab = true;
                } else if (started_active_tab) {
                    ended_active_tab = true;
                }
            }

            if (ended_tabs_loop) {
                return false;
            }

            if (started_tabs) {
                if (ended_active_tab) {
                    jQuery(this).hide();

                } else if (started_active_tab) {
                    if (jQuery(this).hasClass('acf-field-tab') || jQuery(this).hasClass('is_tab_endpoint') || jQuery(this).hasClass('is_accordion_endpoint')) {
                        jQuery(this).hide();
                    } else {
                        jQuery(this).show();
                    }

                } else {
                    jQuery(this).hide();
                }
            }
        });
    });

    /* Tab selection for Inner Lavel into Accordion-Repeater */
    jQuery(document).on("click", "form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-repeater .ufc-repeater-sub-fields-wrap .acf-tab-wrap ul.acf-tab-group li > a.acf-tab-button", function (e) {
        e.preventDefault();
        var acf_tab_button = jQuery(this);
        acf_tab_button.closest('ul.acf-tab-group').find('li').removeClass('active');
        acf_tab_button.closest('li').addClass('active');
        var ucf_tab_field_key = acf_tab_button.attr('data-key');
        var started_tabs = false;
        var started_active_tab = false;
        var ended_active_tab = false;
        var ended_tabs_loop = false;

        /*acf_tab_button.closest('.ufc-repeater-sub-fields-wrap').children('.acf-field').each(function (index) {*/
        acf_tab_button.closest('.acf-tab-wrap').children('.acf-tab-content-wrap').children('.acf-field').each(function (index) {

            if (ended_tabs_loop) {
                return false;
            }

            if (jQuery(this).hasClass('acf-field-tab')) {

                if ((started_tabs) && jQuery(this).hasClass('is_tab_endpoint')) {
                    ended_tabs_loop = true;
                }

                if (acf_tab_button.closest('.acf-tab-wrap').is(jQuery(this).closest('.acf-tab-wrap'))) {
                    started_tabs = true;
                }

                if (jQuery(this).attr('data-key') == ucf_tab_field_key) {
                    started_active_tab = true;
                } else if (started_active_tab) {
                    ended_active_tab = true;
                }
            }

            if (ended_tabs_loop) {
                return false;
            }

            if (started_tabs) {
                if (ended_active_tab) {
                    jQuery(this).hide();

                } else if (started_active_tab) {
                    if (jQuery(this).hasClass('acf-field-tab') || jQuery(this).hasClass('is_tab_endpoint') || jQuery(this).hasClass('is_accordion_endpoint')) {
                        jQuery(this).hide();
                    } else {
                        jQuery(this).show();
                    }

                } else {
                    jQuery(this).hide();
                }
            }
        });
    });


    /* Tab selection for Inner Lavel into Accordion */
    jQuery(document).on("click", "form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-accordion .acf-input.acf-accordion-content .acf-fields.ufc-accordion-sub-fields-wrap > .acf-tab-wrap ul.acf-tab-group li > a.acf-tab-button", function (e) {
        e.preventDefault();
        var acf_tab_button = jQuery(this);
        acf_tab_button.closest('ul.acf-tab-group').find('li').removeClass('active');
        acf_tab_button.closest('li').addClass('active');
        var ucf_tab_field_key = acf_tab_button.attr('data-key');
        var started_tabs = false;
        var started_active_tab = false;
        var ended_active_tab = false;
        var ended_tabs_loop = false;

        /*acf_tab_button.closest('.acf-fields.ufc-accordion-sub-fields-wrap').children('.acf-field').each(function (index) {*/
        acf_tab_button.closest('.acf-tab-wrap').children('.acf-tab-content-wrap').children('.acf-field').each(function (index) {

            if (ended_tabs_loop) {
                return false;
            }
            if (jQuery(this).hasClass('acf-field-tab')) {

                if ((started_tabs) && jQuery(this).hasClass('is_tab_endpoint')) {
                    ended_tabs_loop = true;
                }

                if (acf_tab_button.closest('.acf-tab-wrap').is(jQuery(this).closest('.acf-tab-wrap'))) {
                    started_tabs = true;
                }

                if (jQuery(this).attr('data-key') == ucf_tab_field_key) {
                    started_active_tab = true;
                } else if (started_active_tab) {
                    ended_active_tab = true;
                }
            }
            if (ended_tabs_loop) {
                return false;
            }
            if (started_tabs) {
                if (ended_active_tab) {
                    jQuery(this).hide();

                } else if (started_active_tab) {
                    if (jQuery(this).hasClass('acf-field-tab') || jQuery(this).hasClass('is_tab_endpoint') || jQuery(this).hasClass('is_accordion_endpoint')) {
                        jQuery(this).hide();
                    } else {
                        jQuery(this).show();
                    }

                } else {
                    jQuery(this).hide();
                }
            }
        });
    });

    /* Accordion Hide/Show */
    jQuery(document).on("click", "form#ufc_field_post_meta_form .ufc-group-custom-field-content .ufc-group-custom-field-content-wrap .acf-field.acf-field-accordion > .acf-label.acf-accordion-title", function (e) {
        e.preventDefault();
        jQuery(this).closest('.acf-field.acf-field-accordion').toggleClass('ufc-accordion-open');
    });


    /* Edited Post Meta Field : Select Post Item and get the HTML of All Custom Field for specific post */
    jQuery(document).on("click", ".ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item", function (e) {
        e.preventDefault();

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }

        ufcFormUnsaved = false;

        jQuery(".ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item").removeClass("ufc-select-field-group");
        var field_item_el = jQuery(this);
        field_item_el.addClass("ufc-select-field-group");
        var field_group_id = field_item_el.attr("data-field_group_id");
        var field_group_key = field_item_el.attr("data-field_group_key");
        var field_post_id = field_item_el.attr("data-field_post_id");

        jQuery(".ufc-field-data-section-wrap .ufc-field-data-section-content").html("");
        // jQuery('.ultimate-field-collections-page-wrap').css('opacity','0.7').css('pointer-events','none');
        var ufc_field_group_data = {
            action: "ufc_select_field_group_post_item",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
            ufc_field_group_id: field_group_id,
            ufc_field_group_key: field_group_key,
            ufc_field_post_id: field_post_id,
        };

        var collection_link = UFC_Admin_Ajax.ufc_admin_page_url;
        collection_link += "&collection=";
        collection_link += field_group_id;
        collection_link += "&tab=content&post=";
        collection_link += field_post_id;
        window.history.pushState('', '', collection_link);

        $.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_field_group_data,
            success: function (response) {
                response = JSON.parse(response);
                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                if (response.post_field_html) {

                    jQuery(".ufc-field-data-section-wrap .ufc-field-data-section-content").html(response.post_field_html);
                    jQuery(".ultimate-field-collections-content .ufc-content-header-title .post .post-name").text(jQuery(".ufc-field-data-section-content input[name='ufc_post_title_input']").val()).parents(".post").css("display", "grid");

                    ufc_post_fields_accordion_tab_restructured();

                    setTimeout(function () {
                        if (jQuery("form#ufc_field_post_meta_form .acf-field.acf-field-relationship").length) {
                            jQuery("form#ufc_field_post_meta_form .acf-field.acf-field-relationship").each(function (index) {
                                $this = jQuery(this).find(".acf-input .acf-relationship-wrap .filters.acf-relationship-head .filter.acf-relationship-filter-search input");
                                relationship_create($this);
                            });
                        }
                    }, 300);

                    setTimeout(function () {
                        ufc_post_fields_js_reload();
                    }, 2000);

                    jQuery(".ufc-field-data-section-sidebar").addClass("active");
                    jQuery(".ultimate-field-collections-page-wrap").attr(
                        {
                            "data-collection_list": "active",
                            "data-collection_settings": "",
                            "data-post_list": "active",
                            "data-post_content": "active",
                            "data-create_field_collection": ""
                        }
                    );
                }
            },
        });
    });

    /* Edited Post Meta Field : Unset Single Image */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-image .acf-edit-image-content .acf-edit-image-remove", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var ufc_image_content_wrap = jQuery(this).closest(".acf-edit-image-content-main");
        ufc_image_content_wrap.find(".acf-edit-image-content").hide();
        ufc_image_content_wrap.find(".acf-new-image-content").show();
        ufc_image_content_wrap.find("input.acf-edit-image-id").val("");
    });

    /* Edited Post Meta Field : Upload Single Image */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-image .acf-edit-image-content-main .acf-edit-image-upload", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ufc_image_content_wrap = jQuery(this).closest(".acf-edit-image-content-main");
        var image_frame;
        if (image_frame) {
            image_frame.open();
        }
        image_frame = wp.media({
            title: "Select Media",
            multiple: false,
            library: {
                type: "image",
            },
        });
        image_frame.on("close", function () {
            var selection = image_frame.state().get("selection");
            selection.each(function (attachment) {

                ufcFormUnsaved = true;

                var file_id = attachment["id"];
                var file_name = attachment["attributes"]["filename"];
                var file_size = attachment["attributes"]["filesizeHumanReadable"];
                var file_url = attachment["attributes"]["url"];
                var file_height = attachment["attributes"]["height"];
                var file_width = attachment["attributes"]["width"];
                var file_type = attachment["attributes"]["type"];
                var file_subtype = attachment["attributes"]["subtype"];
                var file_sizeInBytes = attachment["attributes"]["filesizeInBytes"];

                ufc_image_content_wrap.attr("data-file_height", file_height);
                ufc_image_content_wrap.attr("data-file_width", file_width);
                ufc_image_content_wrap.attr("data-file_type", file_type);
                ufc_image_content_wrap.attr("data-file_subtype", file_subtype);
                ufc_image_content_wrap.attr("data-file_sizeInBytes", file_sizeInBytes);

                ufc_image_content_wrap.find(".acf-edit-image-content").show();
                ufc_image_content_wrap.find(".acf-new-image-content").hide();
                ufc_image_content_wrap.find("input.acf-edit-image-id").val(file_id);
                ufc_image_content_wrap.find(".acf-edit-image-wrap .acf-edit-image").attr("src", file_url);
                ufc_image_content_wrap.find(".acf-edit-image-wrap .acf-edit-image-name").html(file_name);
                ufc_image_content_wrap.find(".acf-edit-image-wrap .acf-edit-image-info").html(file_height + " x " + file_height + " • " + file_size);
            });
        });
        image_frame.on("open", function () {
            var selection = image_frame.state().get("selection");
        });
        image_frame.open();
    });

    /* Edited Post Meta Field : Remove Single Image from Gallery Multiple Images list */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field-gallery .acf-edit-gallery-content-main .acf-gallery-main .acf-gallery-attachments .acf-gallery-attachment .actions .acf-gallery-remove", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var ufc_gallery_attachment_wrap = jQuery(this).closest(".acf-gallery-attachment");
        ufc_gallery_attachment_wrap.remove();
    });

    /* Edited Post Meta Field : Upload Gallery Multiple Images */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-gallery .acf-edit-gallery-content-main .acf-edit-gallery-upload", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var ufc_gallery_content_wrap = jQuery(this).closest(".acf-edit-gallery-content-main");
        var ufc_gallery_input = ufc_gallery_content_wrap.find(".acf-edit-gallery-input");
        var ufc_gallery_input_name = ufc_gallery_input.attr("name");

        var image_frame;
        if (image_frame) {
            image_frame.open();
        }

        image_frame = wp.media({
            title: "Select Media",
            multiple: true,
            library: {
                type: "image",
            },
        });

        image_frame.on("close", function () {
            var selection = image_frame.state().get("selection");
            selection.each(function (attachment) {

                ufcFormUnsaved = true;

                var file_id = attachment["id"];
                var file_name = attachment["attributes"]["filename"];
                var file_url = attachment["attributes"]["url"];
                var gallery_attachment_html = '<div class="acf-gallery-attachment" data-id="';
                gallery_attachment_html += file_id;
                gallery_attachment_html += '"><input type="hidden" name="';
                gallery_attachment_html += ufc_gallery_input_name;
                gallery_attachment_html += '[]" value="';
                gallery_attachment_html += file_id;
                gallery_attachment_html += '"><div class="thumbnail"><img src="';
                gallery_attachment_html += file_url;
                gallery_attachment_html += '"></div><div class="actions"><span class="acf-gallery-remove" title="Remove"><i class="fa fa-times"></i></span></div></div>';

                ufc_gallery_content_wrap.find(".acf-gallery-attachments").append(gallery_attachment_html);
            });
        });

        image_frame.on("open", function () {
            var selection = image_frame.state().get("selection");
            /*var ids = jQuery('input#myprefix_image_id').val().split(',');
            ids.forEach(function(id) {
                var attachment = wp.media.attachment(id);
                attachment.fetch();
                selection.add( attachment ? [ attachment ] : [] );
            });*/
        });
        image_frame.open();
    });

    /* Edited Post Meta Field : Unset File */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-file .acf-edit-file-content .acf-edit-file-remove", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var ufc_file_content_wrap = jQuery(this).closest(".acf-edit-file-content-main");
        ufc_file_content_wrap.find(".acf-edit-file-content").hide();
        ufc_file_content_wrap.find(".acf-new-file-content").show();
        ufc_file_content_wrap.find("input.acf-edit-file-id").val("");
    });

    /* Edited Post Meta Field : Upload Single File */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-file .acf-edit-file-content-main .acf-edit-file-upload", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ufc_file_content_wrap = jQuery(this).closest(".acf-edit-file-content-main");
        var file_frame;
        if (file_frame) {
            file_frame.open();
        }
        file_frame = wp.media({
            title: "Select Media",
            multiple: false,
            library: {
                // type : 'file',
            },
        });
        file_frame.on("close", function () {
            var selection = file_frame.state().get("selection");
            selection.each(function (attachment) {

                ufcFormUnsaved = true;

                var file_id = attachment["id"];
                var file_name = attachment["attributes"]["filename"];
                var file_size = attachment["attributes"]["filesizeHumanReadable"];
                var file_url = attachment["attributes"]["url"];
                var file_icon = attachment["attributes"]["icon"];
                if (attachment["attributes"]["type"] == "image") {
                    file_icon = attachment["attributes"]["url"];
                }
                var file_height = attachment["attributes"]["height"];
                var file_width = attachment["attributes"]["width"];
                var file_type = attachment["attributes"]["type"];
                var file_subtype = attachment["attributes"]["subtype"];
                var file_sizeInBytes = attachment["attributes"]["filesizeInBytes"];

                ufc_file_content_wrap.attr("data-file_height", file_height);
                ufc_file_content_wrap.attr("data-file_width", file_width);
                ufc_file_content_wrap.attr("data-file_type", file_type);
                ufc_file_content_wrap.attr("data-file_subtype", file_subtype);
                ufc_file_content_wrap.attr("data-file_sizeInBytes", file_sizeInBytes);

                ufc_file_content_wrap.find(".acf-edit-file-content").show();
                ufc_file_content_wrap.find(".acf-new-file-content").hide();
                ufc_file_content_wrap.find("input.acf-edit-file-id").val(file_id);
                ufc_file_content_wrap.find(".acf-edit-file-wrap img.acf-edit-icon").attr("src", file_icon);
                ufc_file_content_wrap.find(".acf-edit-file-wrap img.acf-edit-icon").attr("title", file_name.replace('"', "").replace("'", ""));
                ufc_file_content_wrap.find(".acf-edit-file-wrap img.acf-edit-icon").attr("alt", file_name.replace('"', "").replace("'", ""));
                ufc_file_content_wrap.find(".acf-edit-file-wrap .acf-edit-file-name").html(file_name);
                ufc_file_content_wrap.find(".acf-edit-file-wrap .acf-edit-file-info").html(file_size);
            });
        });
        file_frame.on("open", function () {
            var selection = file_frame.state().get("selection");
        });
        file_frame.open();
    });

    /* Edited Field Collection : Remove option from Dropdown Fields section */
    jQuery(document).on("click", ".field-edit-options-wrap .field-edit-content-row .field-edit-col .field-edit-remove-option", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        jQuery(this).closest(".field-edit-content-row").remove();
    });

    /* Edited Field Collection : Add option on Dropdown Fields section */
    jQuery(document).on("click", ".field-edit-options-wrap .field-edit-options-footer .field-edit-new-option-add", function (e) {
        e.preventDefault();

        ufcFormUnsaved = true;

        var options_wrap_ele = jQuery(this).closest(".field-edit-options-wrap");
        var field_edit_content_row_html = '<div class="field-edit-content-row">';
        field_edit_content_row_html += options_wrap_ele.find(".field-edit-options-lists .field-edit-content-row:first-child").html();
        field_edit_content_row_html += "</div>";
        options_wrap_ele.find(".field-edit-options-lists").append(field_edit_content_row_html);
        options_wrap_ele.find(".field-edit-options-lists .field-edit-content-row:last-child .field-edit-col .ufc-field-input").val("");
    });

    /* Edited Field Collection : Cancel Edit */
    jQuery(document).on("click", ".ultimate-field-collections-content .ufc-content-header-title .home, .ultimate-field-collections-content .ufc-content-header-wrap #ufc_content_cancel", function (e) {
        e.preventDefault();

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }

        ufcFormUnsaved = false;

        var collection_link = UFC_Admin_Ajax.ufc_admin_page_url;

        jQuery(".ufc-field-data-section-sidebar").removeClass("active");

        /* Current view is Fields Tab */
        if (jQuery(this).hasClass("home") || jQuery(".ultimate-field-collections-page-wrap").attr("data-collection_settings") === "active" && jQuery(".ultimate-field-collections-page-wrap").attr("data-post_content") === "") {

            window.history.pushState('', '', collection_link);

            jQuery(".ultimate-field-collections-sidebar").removeClass("active");
            jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").html("");
            jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item").removeClass("ufc-select-field-group");
            jQuery(".ultimate-field-collections-page-wrap").attr(
                {
                    "data-collection_list": "",
                    "data-collection_settings": "",
                    "data-post_list": "",
                    "data-post_content": "",
                    "data-create_field_collection": ""
                }
            );

            // console.log("Current view is Fields Tab");

            /* Current view is Content Tab */
        } else if (jQuery(".ultimate-field-collections-page-wrap").attr("data-collection_settings") === "" && jQuery(".ultimate-field-collections-page-wrap").attr("data-post_list") === "active" && jQuery(".ultimate-field-collections-page-wrap").attr("data-post_content") === "") {

            window.history.pushState('', '', collection_link);
            jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").html("");
            jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item').removeClass('ufc-select-field-group');

            jQuery(".ultimate-field-collections-page-wrap").attr(
                {
                    "data-collection_list": "active",
                    "data-collection_settings": "",
                    "data-post_list": "active",
                    "data-post_content": ""
                }
            );

            // console.log("Current view is Content Tab");

            /* Current view is Content Tab - Post Content */
        } else if (jQuery(".ultimate-field-collections-page-wrap").attr("data-collection_settings") === "" && jQuery(".ultimate-field-collections-page-wrap").attr("data-post_content") === "active") {


            var field_group_id = jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item.ufc-select-field-group").attr("data-field_group_id");
            var collection_link = UFC_Admin_Ajax.ufc_admin_page_url;
            collection_link += "&collection=";
            collection_link += field_group_id;
            collection_link += "&tab=content";
            window.history.pushState('', '', collection_link);

            jQuery(".ultimate-field-collections-content .ufc-tab-content .ufc-field-data-section-wrap .ufc-field-data-section-content").html("");
            jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item').removeClass('ufc-select-field-group');
            jQuery(".ultimate-field-collections-content .ufc-content-header-title .post .post-name").text("").parents(".post").hide();

            jQuery(".ultimate-field-collections-page-wrap").attr(
                {
                    "data-collection_list": "active",
                    "data-collection_settings": "",
                    "data-post_list": "active",
                    "data-post_content": ""
                }
            );

            // console.log("Current view is Post Content");
        }
    });

    // 	jQuery(document).on("click", "#ufc_field_data_tab_content .ufc-field-data-section-content #ufc_custom_field_content_cancel", function (e) {
    // 		e.preventDefault();
    // 
    // 		if (ufcFormUnsaved) {
    // 			if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
    // 				return false;
    // 			}
    // 		}
    // 
    // 		ufcFormUnsaved = false;
    // 
    // 		/* if Post Content is active */
    // 		if (jQuery(".ultimate-field-collections-page-wrap").attr("data-post_content") === "active") {
    // 			
    // 			if(jQuery("#ufc_field_data_tab_content .ufc-field-data-section-wrap").hasClass("no-sidebar")){
    // 				jQuery("#ufc_field_data_tab_content .ufc-field-data-section-wrap").removeClass("no-sidebar");
    // 			}
    // 			
    // 			jQuery(".ufc-field-data-section-sidebar").removeClass("active");
    // 			jQuery("#ufc_field_data_tab_content .ufc-field-data-section-content").html("");
    // 			jQuery('.ufc-field-data-section-sidebar ul.ufc-field-posts-list-wrap li.ufc-field-post-list-item').removeClass('ufc-select-field-group');
    // 			jQuery(".ultimate-field-collections-page-wrap").attr(
    // 				{
    // 					"data-collection_list": "active",
    // 					"data-collection_settings": "",
    // 					"data-post_list": "active",
    // 					"data-post_content": ""
    // 				}
    // 			);
    // 		}
    // 	});

    /* Edited Field Collection : Delete Field */
    jQuery(document).on("click", ".field-edit-view-wrap .edit-field-header .edit-field-actions ul.edit-field-actions-ul .edit-field-delete-action", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(ufcDeleteConfirmationMessage) == false) {
            return false;
        }

        ufcFormUnsaved = true;

        var del_field_wrap_el = jQuery(this).closest(".field-edit-view-wrap");
        var del_field_type = del_field_wrap_el.find("input[name$='[type]']").val();

        if (del_field_wrap_el.find("input[name$='[ID]']").length > 1) {
            /* Delete for repeater, group, accordion and tab with sub-fields */
            del_field_wrap_el.find("input[name$='[ID]']").each(function (index) {
                var acf_field_id = jQuery(this).val();
                var acf_delete_field_html = '<input type="hidden" name="_acf_delete_fields[]" value="';
                acf_delete_field_html += acf_field_id;
                acf_delete_field_html += '">';
                jQuery(this).closest("#ufc_settings_form").append(acf_delete_field_html);
            });
            del_field_wrap_el.remove();
        } else {
            /* Delete default */
            var acf_field_id = del_field_wrap_el.attr("data-acf_field_id");
            var acf_delete_field_html = '<input type="hidden" name="_acf_delete_fields[]" value="';
            acf_delete_field_html += acf_field_id;
            acf_delete_field_html += '">';
            jQuery(this).closest("#ufc_settings_form").append(acf_delete_field_html);
            del_field_wrap_el.remove();
        }
    });

    function ufc_field_uniqid_generator(prefix, moreEntropy) {
        var uniqidSeed = "";
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
        if (typeof prefix === "undefined") {
            prefix = "";
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
                return Array(1 + (reqWidth - seed.length)).join("0") + seed;
            }

            return seed;
        };

        if (!uniqidSeed) {
            // init seed with big random int
            uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        }

        uniqidSeed++;
        retId = prefix; // start with prefix, add current milliseconds hex string

        retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
        retId += formatSeed(uniqidSeed, 5); // add seed hex string

        if (moreEntropy) {
            // for more entropy we add a float lower to 10
            retId += (Math.random() * 10).toFixed(8).toString();
        }

        return retId;
    }

    /* Edited Field Collection : Duplicate Field */
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

        jQuery(".ufc-field-data-section-wrap .ufc-field-data-section-content").html("");
        jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");

        var ufc_duplicate_field_data = {
            action: "ufc_duplicate_field_item",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
            ufc_field_group_id: field_group_id,
            ufc_field_group_key: field_group_key,
            ufc_field_id: acf_field_id,
            ufc_field_type: acf_field_type,
            ufc_field_key: acf_field_key,
            ufc_field_parent: acf_field_parent,
        };
        $.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_duplicate_field_data,
            success: function (response) {
                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                response = JSON.parse(response);
                if (response.duplicated_field_html) {
                    jQuery(response.duplicated_field_html).insertAfter(acf_field_wrap);
                    ufc_field_group_list_sortable();
                    ufc_update_field_group_list_menu_order();
                }
                if (jQuery("select.ufc-field-select2").length) {
                    jQuery("select.ufc-field-select2").select2();
                }
            },
        });
    });

    /* Edited Field Collection : Add field Settings Tab section */
    jQuery(document).on("click", "form#ufc_settings_form .ufc-group-custom-fields .field-edit-repeater-content-wrap .field-edit-repeater-add-sub_field", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (jQuery(this).closest(".field-edit-repeater-content-wrap").find(".field-edit-repeater-footer .ufc-repeater-sub-fields-icons:visible").length) {
            jQuery(this).closest(".field-edit-repeater-content-wrap").find(".field-edit-repeater-footer .ufc-repeater-sub-fields-icons").hide();
        } else {
            jQuery(this).closest(".field-edit-repeater-content-wrap").find(".field-edit-repeater-footer .ufc-repeater-sub-fields-icons").css("display", "grid");
        }
        // jQuery("html, body").animate(
        // 	{
        // 		scrollTop: jQuery(this).closest(".field-edit-repeater-content-wrap").find(".field-edit-repeater-footer .ufc-repeater-sub-fields-icons").offset().top,
        // 	},
        // 	1000
        // );
    });

    /* Edited Field Collection : Add field Settings Tab section */
    jQuery(document).on("click", "form#ufc_settings_form .ufc-group-custom-fields .field-edit-repeater-content-wrap .field-edit-group-add-sub_field", function (e) {
        e.preventDefault();
        e.stopPropagation();
        /*
        jQuery(this).closest('.field-edit-repeater-content-wrap').children('.field-edit-repeater-footer').find('.ufc-repeater-sub-fields-icons .ufc-group-custom-field-row[data-field_type="tab"]').trigger('click');
        jQuery(this).closest('.field-edit-repeater-content-wrap').children('.field-edit-repeater-footer').find('.ufc-repeater-sub-fields-icons .ufc-group-custom-field-row[data-field_type="group"]').trigger('click');
        */
        // jQuery("html, body").animate(
        // 	{
        // 		scrollTop: jQuery(this).closest(".field-edit-repeater-content-wrap").children(".field-edit-repeater-sub_fields-lists").offset().top,
        // 	},
        // 	1000
        // );

        var button_id = jQuery(this).attr("id");
        var repeater_fields_content_wrap = jQuery(this).closest(".field-edit-repeater-content-wrap");
        var repeater_field_wrap = jQuery(this).closest(".field-edit-view-wrap");
        var parent_field_id = repeater_field_wrap.find("input[name$='[ID]']").first().val();
        var group_layout_style = repeater_field_wrap.find("input[name$='[ufc_layout_style]']").first().val();

        jQuery(".ufc-field-data-section-wrap .ufc-field-data-section-content").html("");
        jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");

        var ufc_create_field_data = {
            action: "ufc_create_field_item",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
            ufc_field_group_id: parent_field_id,
            ufc_field_type: "group",
        };
        $.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_create_field_data,
            success: function (response) {
                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                response = JSON.parse(response);
                if (response.created_field_html) {
                    repeater_fields_content_wrap.children(".field-edit-repeater-sub_fields-lists").append(response.created_field_html);
                    ufc_field_group_list_sortable();
                    ufc_update_field_group_list_menu_order();
                    repeater_fields_content_wrap.children(".field-edit-repeater-sub_fields-lists").find(".field-edit-view-wrap:last-child .edit-field-header").trigger("click");
                }
                if (jQuery("select.ufc-field-select2").length) {
                    jQuery("select.ufc-field-select2").select2();
                }
            },
        });
    });

    /* Edited Field Collection : Create New Field */
    jQuery(document).on("click", ".ufc-group-custom-fields-icons .ufc-group-custom-field-row", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var acf_field_wrap = jQuery(this);
        var acf_field_type = acf_field_wrap.attr("data-field_type");

        var field_group_id = jQuery(this).closest("#ufc_settings_form").find("#ufc_field_group_id").val();
        var field_group_key = jQuery(this).closest("#ufc_settings_form").find("#ufc_field_group_key").val();

        jQuery(".ufc-field-data-section-wrap .ufc-field-data-section-content").html("");
        jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");

        if (acf_field_type == "tab") {
        } else if (acf_field_type == "accordion") {
        } else {
        }

        var ufc_create_field_data = {
            action: "ufc_create_field_item",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
            ufc_field_group_id: field_group_id,
            ufc_field_group_key: field_group_key,
            ufc_field_type: acf_field_type,
        };

        $.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_create_field_data,
            success: function (response) {
                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                response = JSON.parse(response);
                if (response.created_field_html) {
                    jQuery(".ufc-group-custom-fields .ufc-group-custom-fields-content").append(response.created_field_html);
                    ufc_field_group_list_sortable();
                    ufc_update_field_group_list_menu_order();
                    jQuery(".ufc-group-custom-fields .ufc-group-custom-fields-content .field-edit-view-wrap:last-child .edit-field-header").trigger("click");
                }
                if (jQuery("select.ufc-field-select2").length) {
                    jQuery("select.ufc-field-select2").select2();
                }
            },
        });
    });

    /* Edited Field Collection : Create New sub Field on Repeater, Group field */
    jQuery(document).on("click", ".ufc-repeater-sub-fields-icons .ufc-group-custom-field-row", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var acf_field_wrap = jQuery(this);
        var acf_field_type = acf_field_wrap.attr("data-field_type");

        var repeater_fields_content_wrap = jQuery(this).closest(".field-edit-repeater-content-wrap");
        var repeater_field_wrap = jQuery(this).closest(".field-edit-view-wrap");
        var parent_field_id = repeater_field_wrap.find("input[name$='[ID]']").first().val();

        jQuery(".ufc-field-data-section-wrap .ufc-field-data-section-content").html("");
        jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");

        if (acf_field_type == "tab") {
        } else if (acf_field_type == "accordion") {
        } else {
        }
        var ufc_create_field_data = {
            action: "ufc_create_field_item",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
            ufc_field_group_id: parent_field_id,
            ufc_field_type: acf_field_type,
        };

        $.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_create_field_data,
            success: function (response) {
                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                response = JSON.parse(response);
                if (response.created_field_html) {
                    repeater_fields_content_wrap.children(".field-edit-repeater-sub_fields-lists").append(response.created_field_html);
                    ufc_field_group_list_sortable();
                    ufc_update_field_group_list_menu_order();
                    repeater_fields_content_wrap.children(".field-edit-repeater-sub_fields-lists .field-edit-view-wrap:last-child .edit-field-header").trigger("click");
                }
                if (jQuery("select.ufc-field-select2").length) {
                    jQuery("select.ufc-field-select2").select2();
                }
            },
        });
    });

    /* Edited Field Collection : Save the Collection Settings Data */
    jQuery(document).on("click", ".ultimate-field-collections-content .ufc-content-header-wrap #ufc_content_save", function (e) {
        e.preventDefault();
        var ufc_active_tab = jQuery(".ultimate-field-collections-content .ufc-tab-content.ufc-active-tab").attr("id");
        jQuery(".ultimate-field-collections-content .ufc-content-notification-message > div").hide();

        if (ufc_active_tab == "ufc_settings_tab_content") {

            jQuery(".ultimate-field-collections-content .ufc-content-notification-message .ufc-notification-error-message").hide();
            var ufc_field_form_error = false;

            /* Required Field validation */
            if (jQuery(".ultimate-field-collections-content #ufc_settings_tab_content #ufc_settings_form .field-edit-view-wrap").length) {
                jQuery(".ultimate-field-collections-content #ufc_settings_tab_content #ufc_settings_form .field-edit-view-wrap").each(function (index) {

                    if (jQuery(this).hasClass("field-type-tab") || jQuery(this).hasClass("field-type-accordion")) {

                        var field_label_input = jQuery(this).find("input.ufc-field-input[name$='[label]']");
                        var field_endpoint_checkbox = jQuery(this).find("input.ufc-field-checkbox[name$='[endpoint]']");
                        if (field_endpoint_checkbox.prop('checked') == false) {
                            if (field_label_input.val().length == 0) {
                                ufc_field_form_error = true;
                                field_label_input.addClass('ufc_settings_input_error');
                            } else {
                                field_label_input.removeClass('ufc_settings_input_error');
                            }
                        } else {
                            field_label_input.removeClass('ufc_settings_input_error');
                        }

                    } else if (jQuery(this).hasClass("field-type-message")) {

                    } else {

                        var field_label_input = jQuery(this).find("input.ufc-field-input[name$='[label]']");
                        var field_name_input = jQuery(this).find("input.ufc-field-input[name$='[name]']");
                        var choice_values = jQuery(this).find("input.ufc-field-input[name$='[choice_values][]']");
                        var choice_keys = jQuery(this).find("input.ufc-field-input[name$='[choice_keys][]']");

                        if (field_label_input.val().length == 0) {
                            ufc_field_form_error = true;
                            field_label_input.addClass('ufc_settings_input_error');
                        } else {
                            field_label_input.removeClass('ufc_settings_input_error');
                        }

                        if (field_name_input.val().length == 0) {
                            ufc_field_form_error = true;
                            field_name_input.addClass('ufc_settings_input_error');
                        } else {
                            field_name_input.removeClass('ufc_settings_input_error');
                        }

                        if (choice_values.length > 0) {
                            if (choice_values.val().length == 0) {
                                ufc_field_form_error = true;
                                choice_values.addClass('ufc_settings_input_error');
                                jQuery(this).addClass('field-edit-view-open');
                            } else {
                                choice_values.removeClass('ufc_settings_input_error');
                            }
                        }

                        if (choice_keys.length > 0) {
                            if (choice_keys.val().length == 0) {
                                ufc_field_form_error = true;
                                choice_keys.addClass('ufc_settings_input_error');
                                jQuery(this).addClass('field-edit-view-open');
                            } else {
                                choice_keys.removeClass('ufc_settings_input_error');
                            }
                        }
                    }

                });
            }

            if (ufc_field_form_error == true) {
                jQuery(".ultimate-field-collections-content .ufc-content-notification-message .ufc-notification-error-message").show();

            } else if (ufc_field_form_error == false) {

                ufcFormUnsaved = false;

                jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
                var form_el = jQuery(".ultimate-field-collections-content #ufc_settings_tab_content #ufc_settings_form");
                var field_group_status = form_el.find("input[name='ufc_field_group_status']");
                var status = '';
                if (field_group_status.is(":checked")) {
                    status = 1;
                } else {
                    status = 0;
                }

                $.ajax({
                    method: "post",
                    url: UFC_Admin_Ajax.ajax_url,
                    data: form_el.serialize() + "&status=" + status + "&action=ufc_save_field_group_settings_tab&nonce=" + UFC_Admin_Ajax.ufc_ajax_nonce,
                    success: function (response) {
                        /* Show success/error notification message */
                        response = JSON.parse(response);
                        if (response.success) {
                            jQuery(".ufc-field-list-item.ufc-select-field-group").find('span.ufc-field-list-item-name').text(jQuery("input#Collection_Name").val());
                            jQuery(".ultimate-field-collections-content .ufc-content-notification-message .ufc-notification-success-message").show();

                            jQuery(".ufc-fields-list-wrap > li[data-field_group_id='" + response.post_id + "']").attr('data-status', response.post_status);
                            jQuery(".ufc-field-list-header-item.ufc-list-filters .starred .count").html("(" + response.starred_count + ")");
                            jQuery(".ufc-field-list-header-item.ufc-list-filters .all .count").html("(" + response.all_count + ")");
                            jQuery(".ufc-field-list-header-item.ufc-list-filters .publish .count").html("(" + response.active_count + ")");
                            jQuery(".ufc-field-list-header-item.ufc-list-filters .acf-disabled .count").html("(" + response.disabled_count + ")");
                            jQuery(".ufc-field-list-header-item.ufc-list-filters .trash .count").html("(" + response.trash_count + ")");

                            if (status == 1) {
                                jQuery(".ufc-list-filters li.publish a").trigger('click');
                            } else {
                                jQuery(".ufc-list-filters li.acf-disabled a").trigger('click');
                            }

                            setTimeout(function () {
                                jQuery(".ultimate-field-collections-content .ufc-content-notification-message > div").hide();
                            }, 4000);
                            if (jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item.ufc-select-field-group").length) {
                                setTimeout(function () {
                                    jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item.ufc-select-field-group").trigger("click");
                                }, 1000);
                            } else {
                                jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                            }
                        } else if (response.error) {
                            jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                            jQuery(".ultimate-field-collections-content .ufc-content-notification-message .ufc-notification-error-message").show();
                            setTimeout(function () {
                                jQuery(".ultimate-field-collections-content .ufc-content-notification-message > div").hide();
                            }, 4000);
                        }
                    },
                });

            }

        } else if (ufc_active_tab == "ufc_field_data_tab_content") {

            var ufc_field_form_error = false;
            jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field .ufc-field-errors").hide();

            /* Required Field validation */
            if (jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.is-required").length) {
                jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.is-required").each(function (index) {
                    if (jQuery(this).hasClass("acf-field-wysiwyg")) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap > textarea.ufc-editor-area").val();
                        var field_required = jQuery(this).attr("data-required");
                        if (field_input_val.length == 0) {
                            if (field_required == 1) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                            }
                        }
                    } else if (jQuery(this).hasClass("acf-field-google_map")) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap .acf-google-map > input.ufc-map-field-input").val();
                        if (field_input_val.length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-link")) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap .acf-link div > input.input-url").val();
                        if (field_input_val.length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-url")) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap input").val();
                        if (field_input_val.length == 0 || /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(field_input_val) == false) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-color_picker")) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap .wp-picker-container .wp-picker-input-wrap > input.wp-color-picker").val();
                        if (field_input_val.length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-file")) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap .acf-edit-file-content-main > input.acf-edit-file-id").val();
                        if (field_input_val.length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-image")) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap .acf-edit-image-content-main > input.acf-edit-image-id").val();
                        if (field_input_val.length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-gallery")) {
                        if (jQuery(this).find(".acf-edit-gallery-content-main .acf-gallery-main .acf-gallery-attachments .acf-gallery-attachment").length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-true_false")) {
                        if (jQuery(this).find(".acf-input-wrap label.ufc-field-checkbox-switch input:checked").length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-checkbox")) {
                        if (jQuery(this).find(".acf-checkbox-wrap label.acf-checkbox-choices input:checked").length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-radio")) {
                        if (jQuery(this).find(".acf-radio-wrap label.acf-radio-choices input:checked").length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-select") || jQuery(this).hasClass("acf-field-ufc_reference") || jQuery(this).hasClass("acf-field-taxonomy") || jQuery(this).hasClass("acf-field-post_object")) {
                        var field_input_val = jQuery(this).find(".acf-select-wrap > select").val();
                        if (field_input_val.length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-relationship")) {
                        if (jQuery(this).find(".acf-relationship-wrap > .selection > .values > ul.values-list > li").length == 0) {
                            ufc_field_form_error = true;
                            jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                        }
                    } else if (jQuery(this).hasClass("acf-field-textarea")) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap > textarea").val();
                        var field_required = jQuery(this).attr("data-required");
                        if (field_input_val.length == 0) {
                            if (field_required == 1) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                            }
                        }
                    } else if (jQuery(this).hasClass("acf-field-user")) {
                        var field_input_val = jQuery(this).find(".acf-select-wrap > select").val();
                        var field_required = jQuery(this).attr("data-required");
                        if (field_input_val.length == 0) {
                            if (field_required == 1) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                            }
                        }
                    } else if (jQuery(this).hasClass("acf-field-page_link")) {
                        var field_input_val = jQuery(this).find(".acf-select-wrap > select").val();
                        var field_required = jQuery(this).attr("data-required");
                        if (field_input_val.length == 0) {
                            if (field_required == 1) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                            }
                        }
                    } else if (jQuery(this).hasClass("acf-field-email")) {
                        var field_input_val = jQuery(this).find(".acf-email-wrap input").val();
                        var field_required = jQuery(this).attr("data-required");
                        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                        if (field_input_val.length == 0) {
                            if (field_required == 1) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                            }
                        }
                    } else {
                        var field_input_val = jQuery(this).find(".acf-input-wrap > input").val();
                        var field_required = jQuery(this).attr("data-required");
                        if (field_input_val.length == 0) {
                            if (field_required == 1) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                            }
                        }
                    }
                });
            }

            /* Text Field validation */
            if (jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-text").length) {
                jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-text").each(function (index) {
                    var field_input_val = jQuery(this).find(".acf-input-wrap > input").val();
                    var field_required = jQuery(this).attr("data-required");
                    var field_minlength = parseInt(jQuery(this).attr("data-minlength"));
                    var field_maxlength = parseInt(jQuery(this).attr("data-maxlength"));

                    if (field_minlength > 0 && field_input_val.length < field_minlength) {
                        ufc_field_form_error = true;
                        jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-minlength").show();
                    }
                    if (field_maxlength > 0 && field_input_val.length > field_maxlength) {
                        ufc_field_form_error = true;
                        jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-maxlength").show();
                    }
                });
            }

            /* Email Field validation */
            if (jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-email").length) {
                jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-email").each(function (index) {
                    var field_input_val = jQuery(this).find(".acf-email-wrap > input").val();
                    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (jQuery(this).find(".acf-email-wrap > input").length > 0 && field_input_val.length > 0 && regex.test(field_input_val) == false) {
                        ufc_field_form_error = true;
                        jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-required").show();
                    }
                });
            }


            /* Text Area Field validation */
            if (jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-textarea").length) {
                jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-textarea").each(function (index) {
                    var field_input_val = jQuery(this).find(".acf-input-wrap > textarea").val();
                    var field_required = jQuery(this).attr("data-required");
                    var field_minlength = parseInt(jQuery(this).attr("data-minlength"));
                    var field_maxlength = parseInt(jQuery(this).attr("data-maxlength"));

                    if (field_minlength > 0 && field_input_val.length < field_minlength) {
                        ufc_field_form_error = true;
                        jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-minlength").show();
                    }
                    if (field_maxlength > 0 && field_input_val.length > field_maxlength) {
                        ufc_field_form_error = true;
                        jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-maxlength").show();
                    }
                });
            }

            /* Rich Text Field value update */
            if (jQuery("form#ufc_field_post_meta_form .acf-field.acf-field-wysiwyg .acf-input-wrap textarea.ufc-editor-area").length) {
                jQuery("form#ufc_field_post_meta_form .acf-field.acf-field-wysiwyg .acf-input-wrap textarea.ufc-editor-area").each(function (index) {
                    var $textarea = jQuery(this);
                    if (jQuery(this).closest('.acf-field.acf-field-wysiwyg').attr("data-name") == "editorjs_field") {
                        var wysiwyg_editor_id = jQuery(this).attr("id");

                        // ucf_field_wysiwyg_Editor[wysiwyg_editor_id].save()
                        // .then((savedData) => {
                        //   cPreview.show(savedData, document.getElementById('editorjs-' + wysiwyg_editor_id + "-output"));
                        // })
                        // .catch((error) => {
                        //   console.error('Saving error', error);
                        // });

                    } else {
                        $textarea.val(CKEDITOR.instances[$textarea.attr("id")].getData());
                    }
                });
            }
            /* Rich Text Field validation */
            if (jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-wysiwyg").length) {
                jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-wysiwyg").each(function (index) {
                    var field_input_val = jQuery(this).find(".acf-input-wrap > textarea.ufc-editor-area").val();
                    var field_required = jQuery(this).attr("data-required");
                    var field_minlength = parseInt(jQuery(this).attr("data-minlength"));
                    var field_maxlength = parseInt(jQuery(this).attr("data-maxlength"));

                    /*if ( field_input_val.length == 0 ) {
                        if ( field_required == 1 ) {
                            ufc_field_form_error = true;
                            jQuery(this).find('.ufc-field-errors").show().find("p.ufc-field-error-required').show();
                        }
                    }*/
                    if (field_minlength > 0 && field_input_val.length <= field_minlength) {
                        ufc_field_form_error = true;
                        jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-minlength").show();
                    }
                    if (field_maxlength > 0 && field_input_val.length >= field_maxlength) {
                        ufc_field_form_error = true;
                        jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-maxlength").show();
                    }
                });
            }

            /* Number Field validation */
            if (jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-number").length) {
                jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-number").each(function (index) {
                    var field_input_val = parseInt(jQuery(this).find(".acf-input-wrap > input").val());
                    var field_min_val = parseInt(jQuery(this).attr("data-minlength"));
                    var field_max_val = parseInt(jQuery(this).attr("data-maxlength"));

                    if (field_min_val > 0 && field_input_val < field_min_val) {
                        ufc_field_form_error = true;
                        jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-minlength").show();
                    }
                    if (field_max_val > 0 && field_input_val > field_max_val) {
                        ufc_field_form_error = true;
                        jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-maxlength").show();
                    }
                });
            }

            /* Image Field validation */
            if (jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-image").length) {
                jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-image").each(function (index) {
                    var field_input = jQuery(this).find(".acf-input-wrap input.acf-edit-image-id");
                    if (field_input.length) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap input.acf-edit-image-id").val();
                        if (field_input_val.length) {
                            var field_required = parseInt(jQuery(this).attr("data-required"));
                            var field_mime_types = jQuery(this).attr("data-mime_types");
                            var field_min_width = parseInt(jQuery(this).attr("data-min_width"));
                            var field_max_width = parseInt(jQuery(this).attr("data-max_width"));
                            var field_min_height = parseInt(jQuery(this).attr("data-min_height"));
                            var field_max_height = parseInt(jQuery(this).attr("data-max_height"));
                            var field_min_size = parseInt(jQuery(this).attr("data-min_size"));
                            var field_max_size = parseInt(jQuery(this).attr("data-max_size"));

                            var ufc_image_content_wrap = jQuery(this).find(".acf-edit-image-content-main");
                            var file_height = parseInt(ufc_image_content_wrap.attr("data-file_height"));
                            var file_width = parseInt(ufc_image_content_wrap.attr("data-file_width"));
                            var file_type = ufc_image_content_wrap.attr("data-file_type");
                            var file_subtype = ufc_image_content_wrap.attr("data-file_subtype");
                            var file_sizeInBytes = parseInt(ufc_image_content_wrap.attr("data-file_sizeInBytes"));

                            if (field_min_width > 0 && file_width <= field_min_width) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-min_width").show();
                            }
                            if (field_max_width > 0 && file_width >= field_max_width) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-max_width").show();
                            }
                            if (field_min_height > 0 && file_height <= field_min_height) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-min_height").show();
                            }
                            if (field_max_height > 0 && file_height >= field_max_height) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-max_height").show();
                            }
                            if (field_min_size > 0 && file_sizeInBytes <= field_min_size * 1000000) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-min_size").show();
                            }
                            if (field_max_size > 0 && file_sizeInBytes >= field_max_size * 1000000) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-max_size").show();
                            }
                        }
                    }
                });
            }

            /* Image Field validation */
            if (jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-file").length) {
                jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-file").each(function (index) {
                    var field_input = jQuery(this).find(".acf-input-wrap input.acf-edit-file-id");
                    if (field_input.length) {
                        var field_input_val = jQuery(this).find(".acf-input-wrap input.acf-edit-file-id").val();
                        if (field_input_val.length) {
                            var field_required = jQuery(this).attr("data-required");
                            var field_mime_types = jQuery(this).attr("data-mime_types");
                            var field_min_width = parseInt(jQuery(this).attr("data-min_width"));
                            var field_max_width = parseInt(jQuery(this).attr("data-max_width"));
                            var field_min_height = parseInt(jQuery(this).attr("data-min_height"));
                            var field_max_height = parseInt(jQuery(this).attr("data-max_height"));
                            var field_min_size = parseInt(jQuery(this).attr("data-min_size"));
                            var field_max_size = parseInt(jQuery(this).attr("data-max_size"));

                            var ufc_image_content_wrap = jQuery(this).find(".acf-edit-image-content-main");
                            var file_height = parseInt(ufc_image_content_wrap.attr("data-file_height"));
                            var file_width = parseInt(ufc_image_content_wrap.attr("data-file_width"));
                            var file_type = ufc_image_content_wrap.attr("data-file_type");
                            var file_subtype = ufc_image_content_wrap.attr("data-file_subtype");
                            var file_sizeInBytes = parseInt(ufc_image_content_wrap.attr("data-file_sizeInBytes"));

                            if (field_min_width > 0 && file_width <= field_min_width) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-min_width").show();
                            }
                            if (field_max_width > 0 && file_width >= field_max_width) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-max_width").show();
                            }
                            if (field_min_height > 0 && file_height <= field_min_height) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-min_height").show();
                            }
                            if (field_max_height > 0 && file_height >= field_max_height) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-max_height").show();
                            }
                            if (field_min_size > 0 && file_sizeInBytes <= field_min_size * 1000000) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-min_size").show();
                            }
                            if (field_max_size > 0 && file_sizeInBytes >= field_max_size * 1000000) {
                                ufc_field_form_error = true;
                                jQuery(this).find(".ufc-field-errors").show().find("p.ufc-field-error-max_size").show();
                            }
                        }
                    }
                });
            }

            if (ufc_field_form_error == false) {

                ufcFormUnsaved = false;

                jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");
                var form_el = jQuery(".ultimate-field-collections-content #ufc_field_data_tab_content #ufc_field_post_meta_form");
                $.ajax({
                    method: "post",
                    url: UFC_Admin_Ajax.ajax_url,
                    data: form_el.serialize(),
                    success: function (response) {
                        jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                        response = JSON.parse(response);
                        /* Show success/error notification message */
                        if (response.success) {
                            jQuery(".ufc-field-post-list-item.ufc-select-field-group").find('span.ufc-field-post-list-item-name').text(jQuery(".ufc-field-data-section-content form#ufc_field_post_meta_form .ufc-group-custom-field-content .acf-field .acf-input .acf-input-wrap input").val());
                            jQuery(".ultimate-field-collections-content .ufc-content-notification-message .ufc-notification-success-message").show();
                            
                            setTimeout(function () {
                                jQuery(".ultimate-field-collections-content .ufc-content-notification-message > div").hide();
                            }, 4000);
                        } else if (response.error) {
                            jQuery(".ultimate-field-collections-content .ufc-content-notification-message .ufc-notification-error-message").show();
                            setTimeout(function () {
                                jQuery(".ultimate-field-collections-content .ufc-content-notification-message > div").hide();
                            }, 4000);
                        }
                    },
                });
            } else {
                jQuery(".ultimate-field-collections-content .ufc-content-notification-message .ufc-notification-error-message").show();
                setTimeout(function () {
                    jQuery(".ultimate-field-collections-content .ufc-content-notification-message > div").hide();
                }, 4000);
            }
        }
    });

    /* Edited Field Collection : Add new row on repeater field */
    jQuery(document).on("click", "form#ufc_field_post_meta_form .acf-field-repeater div.ufc-repeater-table div.ufc-repeater-list-footer div.ufc-repeater-actions .ufc-repeater-clone-button", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var ufc_repeater_table_footer = jQuery(this).closest("div.ufc-repeater-list-footer");
        var ufc_repeater_table = ufc_repeater_table_footer.closest("div.ufc-repeater-table");
        var ufc_repeater_list_body = ufc_repeater_table.children("div.ufc-repeater-list-body");
        var field_child_row = jQuery(this).attr("data-field_child_row");
        var field_id = jQuery(this).attr("data-field_id");

        if ((parseInt(field_child_row) == 0) && (ufc_repeater_table.children("div.ufc-repeater-list-body").children(".acf-row").length == 0)) {
            field_child_row = 0;
        } else {
            field_child_row = parseInt(field_child_row) + 1;
        }

        let ufc_repeater_clone = ufc_repeater_table_footer.children("div.ufc-repeater-clone").html();

        /*
        var ufc_r_clone_display_word = "ufc_repeater_clone_index_display" + field_id;
        var ufc_r_clone_display_regex = new RegExp(ufc_r_clone_display_word, "gi");
        let ufc_r_clone_display_count = (ufc_repeater_clone.match(ufc_r_clone_display_regex) || []).length;
        for (var i = 0; i <= ufc_r_clone_display_count; i++) {
            ufc_repeater_clone = ufc_repeater_clone.replace(ufc_r_clone_display_word, (field_child_row + 1));
        }
        */

        var ufc_r_clone_word = "ufc_repeater_clone_index" + field_id;
        var ufc_r_clone_regex = new RegExp(ufc_r_clone_word, "gi");
        let ufc_r_clone_count = (ufc_repeater_clone.match(ufc_r_clone_regex) || []).length;
        for (var i = 0; i <= ufc_r_clone_count; i++) {
            ufc_repeater_clone = ufc_repeater_clone.replace(ufc_r_clone_word, field_child_row);
        }
        let ufc_repeater_new2_row = ufc_repeater_clone;

        var ufc_repeater_new_row_html = '<div class="acf-row" data-id="row-';
        ufc_repeater_new_row_html += field_child_row;
        ufc_repeater_new_row_html += '">';
        ufc_repeater_new_row_html += ufc_repeater_new2_row;
        ufc_repeater_new_row_html += "</div>";
        ufc_repeater_table.children("div.ufc-repeater-list-body").append(ufc_repeater_new_row_html);

        if (ufc_repeater_list_body.children(".acf-row").length) {
            var ufc_list_count = 1;
            ufc_repeater_list_body.children(".acf-row").each(function (index) {
                jQuery(this).find('.ufc-repeater-sub-fields-title .ufc-accordion-repeater-number').first().html(ufc_list_count);
                ufc_list_count++;
            });
        }

        jQuery(this).attr("data-field_child_row", field_child_row);
    });

    /* Edited Field Collection : Add new row on repeater field */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-repeater.jpn-tabs-activated.jpn-vertical .acf-input-wrap .ufc-repeater-table .jpn-acf-tabs ul.jpn-acf-tabs-actions li.jpn-acf-tab-action.ufc-vertical-repeater-clone-button, .ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-repeater.jpn-tabs-activated.jpn-horizontal .acf-input-wrap .ufc-repeater-table .jpn-acf-tabs ul.jpn-acf-tabs-actions li.jpn-acf-tab-action.ufc-horizontal-repeater-clone-button", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var ufc_repeater_table = jQuery(this).closest("div.ufc-repeater-table");
        var ufc_tabs_td = jQuery(this).closest("div.jpn-acf-tabs");
        var ufc_repeater_table_footer = ufc_repeater_table.children("div.ufc-repeater-list-footer");
        var field_child_row = jQuery(this).attr("data-field_child_row");
        var field_id = jQuery(this).attr("data-field_id");

        if ((parseInt(field_child_row) == 0) && (ufc_repeater_table.children("div.ufc-repeater-list-head").find('div.jpn-acf-tabs > ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav').length == 0)) {
            field_child_row = 0;
        } else {
            field_child_row = parseInt(field_child_row) + 1;
        }

        var ufc_repeater_new_row_html = '<div class="acf-row" data-id="row-';
        ufc_repeater_new_row_html += field_child_row;
        ufc_repeater_new_row_html += '">';

        let ufc_repeater_clone = ufc_repeater_table_footer.children("div.ufc-repeater-clone").html();

        var ufc_r_clone_word = "ufc_repeater_clone_index" + field_id;
        var ufc_r_clone_regex = new RegExp(ufc_r_clone_word, "gi");
        let ufc_r_clone_count = (ufc_repeater_clone.match(ufc_r_clone_regex) || []).length;
        for (var i = 0; i <= ufc_r_clone_count; i++) {
            ufc_repeater_clone = ufc_repeater_clone.replace(ufc_r_clone_word, field_child_row);
        }
        ufc_repeater_new_row_html += ufc_repeater_clone;

        ufc_repeater_new_row_html += "</div>";
        ufc_repeater_table.children("div.ufc-repeater-list-body").append(ufc_repeater_new_row_html);
        var ufc_repeater_new_tab_nav_html = '<li class="jpn-acf-tab-nav" data-target_id="row-';
        ufc_repeater_new_tab_nav_html += field_child_row;
        ufc_repeater_new_tab_nav_html += '">';
        ufc_repeater_new_tab_nav_html += (field_child_row + 1);
        ufc_repeater_new_tab_nav_html += "</li>";
        ufc_repeater_table.children("div.ufc-repeater-list-head").find("div.jpn-acf-tabs > ul.jpn-acf-tabs-nav").append(ufc_repeater_new_tab_nav_html);
        ufc_repeater_table
            .children("div.ufc-repeater-list-head")
            .find('div.jpn-acf-tabs > ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav[data-target_id="row-' + field_child_row + '"]')
            .trigger("click");

        jQuery(this).attr("data-field_child_row", field_child_row);

        if (ufc_tabs_td.find("ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav").length) {
            var ufc_tabs_count = 1;
            ufc_tabs_td.find("ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav").each(function (index) {
                jQuery(this).html(ufc_tabs_count);
                ufc_tabs_count++;
            });
        }

        ufc_post_fields_js_reload();
    });

    /* Edited Field Collection : Delete row from repeater field */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-repeater.jpn-tabs-activated.jpn-vertical .acf-input-wrap .ufc-repeater-table .jpn-acf-tabs ul.jpn-acf-tabs-actions li.jpn-acf-tab-action.ufc-vertical-repeater-remove-button, .ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-repeater.jpn-tabs-activated.jpn-horizontal .acf-input-wrap .ufc-repeater-table .jpn-acf-tabs ul.jpn-acf-tabs-actions li.jpn-acf-tab-action.ufc-horizontal-repeater-remove-button", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(ufcDeleteConfirmationMessage) == false) {
            return false;
        }

        ufcFormUnsaved = true;

        var ufc_tabs_td = jQuery(this).closest("div.jpn-acf-tabs");
        var ufc_repeater_table = ufc_tabs_td.closest("div.ufc-repeater-table");
        var ufc_active_nav_tab = ufc_tabs_td.children("ul.jpn-acf-tabs-nav").children("li.jpn-acf-tab-nav.active");
        var target_id = ufc_active_nav_tab.attr("data-target_id");
        ufc_active_nav_tab.remove();
        ufc_repeater_table.children("div.ufc-repeater-list-body").find("div.acf-row.active").remove();

        if (ufc_tabs_td.children("ul.jpn-acf-tabs-nav").children("li.jpn-acf-tab-nav:first-child").length) {
            ufc_tabs_td.children("ul.jpn-acf-tabs-nav").children("li.jpn-acf-tab-nav:first-child").trigger("click");
        }

        if (ufc_tabs_td.find("ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav").length) {
            var ufc_tabs_count = 1;
            ufc_tabs_td.find("ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav").each(function (index) {
                jQuery(this).html(ufc_tabs_count);
                ufc_tabs_count++;
            });
        }

        ufc_post_fields_js_reload();
    });

    /* Edited Field Collection : Delete row from repeater field */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-repeater > .acf-input div.ufc-repeater-table div.ufc-repeater-list-body div.acf-fields .ufc-repeater-sub-fields-main .ufc-repeater-sub-fields-title > span.ufc-accordion-repeater-remove-button", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(ufcDeleteConfirmationMessage) == false) {
            return false;
        }

        ufcFormUnsaved = true;

        var ufc_repeater_list_body = jQuery(this).closest("div.ufc-repeater-list-body");

        jQuery(this).closest("div.acf-row").remove();

        if (ufc_repeater_list_body.children(".acf-row").length) {
            var ufc_list_count = 1;
            ufc_repeater_list_body.children(".acf-row").each(function (index) {
                jQuery(this).find('.ufc-repeater-sub-fields-title .ufc-accordion-repeater-number').first().html(ufc_list_count);
                ufc_list_count++;
            });
        }
    });

    /* Edited Field Collection : Change Tab on tab field */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .ufc-tab-head-wrap ul.ufc-head-list.ufc-tab-group li a.ufc-tab-button", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var ufc_tab_button = jQuery(this);
        var ufc_tab_wrap = ufc_tab_button.closest(".ufc-tab-wrap");
        var tab_target_key = ufc_tab_button.attr("data-target_key");
        ufc_tab_wrap.find(".ufc-tab-head-wrap ul.ufc-head-list.ufc-tab-group li").removeClass("active");
        ufc_tab_button.closest("li").addClass("active");
        ufc_tab_wrap.find(".ufc-tab-content-wrap .ufc-tab-content-box").hide();
        ufc_tab_wrap.find(".ufc-tab-content-wrap > #" + tab_target_key).show();
    });

    /* Edited Field Collection : Add new row on repeater field */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.ufc-group-video-view .ufc-group-sub-fields-wrap .ufc-group-video-type button.ufc-video-type-button", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var field_video_type = jQuery(this).attr("data-video_type");
        jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-type").hide();
        if (field_video_type == "file") {
            jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-file").show();
            if (jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-file").find(".acf-field.acf-field-file .acf-new-file-content button.acf-edit-file-upload").length) {
                jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-file").find(".acf-field.acf-field-file .acf-new-file-content button.acf-edit-file-upload").trigger("click");
            }
            jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-oembed").hide();
            jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-oembed").find('.acf-field.acf-field-oembed .acf-input .acf-input-wrap input[type="text"]').val("");
        } else if (field_video_type == "oembed") {
            jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-oembed").show();
            jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-file").hide();
            jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-file").find(".acf-field.acf-field-file .acf-input .acf-edit-file-content").hide();
            jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-file").find(".acf-field.acf-field-file .acf-input .acf-new-file-content").show();
            jQuery(this).closest(".ufc-group-sub-fields-wrap").children(".ufc-group-video-field-file").find(".acf-field.acf-field-file .acf-input input.acf-edit-file-id").val("");
        }
    });

    /* Edited Field Collection : Show New Collection form */
    jQuery(document).on("click", ".ultimate-field-collections-sidebar .ufc-field-list-header .ufc-field-list-header-item.ufc-list-title button#Add_Field_Collection", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }

        ufcFormUnsaved = false;
        jQuery(".ultimate-field-collections-page-wrap").attr(
            {
                // "data-collection_list": "",
                // "data-collection_settings": "",
                // "data-post_list": "",
                // "data-post_content": "",
                "data-create_field_collection": "active"
            }
        );
    });

    /* Create Field Collection : Cancel */
    jQuery(document).on("click", ".ultimate-field-collections-content-2 #ufc_create_field_collection_form #ufc_create_field_collection_cancel", function (e) {
        e.preventDefault();

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }

        jQuery("#ufc_create_field_collection_form #Collection_Name").removeClass('error');
        jQuery("#ufc_create_field_collection_form span.error_msg").remove();
        jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content-2 #ufc_create_field_collection_form #Collection_Name").val('');
        // jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content-2").hide();
        // jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-content").html("");
        jQuery(".ufc-field-data-section-sidebar, .ultimate-field-collections-sidebar").removeClass("active");
        // jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item").removeClass("ufc-select-field-group");
        jQuery(".ultimate-field-collections-page-wrap").attr(
            {
                // "data-collection_list": "",
                // "data-collection_settings": "",
                // "data-post_list": "",
                // "data-post_content": "",
                "data-create_field_collection": ""
            }
        );
        ufcFormUnsaved = false;
    });

    jQuery(document).on("click", ".ultimate-field-collections-sidebar .ufc-field-list-header span.close-search", function (e) {
        jQuery(this).parents(".ufc-list-filters").find("ul li a.current").trigger('click');
        jQuery(this).parents(".ufc-list-filters").find(".ufc-field-list-header-item.ufc-list-search").removeClass('active');
        jQuery(this).parents(".ufc-list-filters").find(".ufc-field-list-header-item.ufc-list-search input").val('');
    });

    /* Search Field Collection : Show search bar */

    jQuery(document).on("click", ".ultimate-field-collections-page-wrap .ufc-list-search label", function (e) {
        jQuery(this).parents(".ultimate-field-collections-page-wrap .ufc-list-search").addClass("active");
    });

    $searchInput = jQuery(".ultimate-field-collections-page-wrap").find(".ufc-field-list-header-item.ufc-list-search input");

    /* Search Field Collection : Search Collection by title */
    jQuery(document).on("keyup", ".ultimate-field-collections-sidebar .ufc-field-list-header .ufc-field-list-header-item.ufc-list-search input.ufc-list-search-input", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $this = jQuery(this).parents('.ultimate-field-collections-sidebar');
        var search_input = jQuery(this).val();

        $this.find("ul.ufc-filter-result > li.ufc-filter-result-item").removeClass("ufc-select-field-group");

        /*   var collection_link = UFC_Admin_Ajax.ufc_admin_page_url;
          window.history.pushState('', '', collection_link); */

        if ($this.find("ul.ufc-filter-result > li.ufc-filter-result-item").length) {

            $this.find("ul.ufc-filter-result > li.ufc-filter-result-item").removeClass("ufc-select-field-group");

            if (search_input.length > 0) {
                search_input = search_input.toLowerCase();

                $this.find("ul.ufc-filter-result > li.ufc-filter-result-item").each(function (index) {

                    var item_name = jQuery(this).find('span.ufc-field-list-item-name,span.ufc-field-post-list-item-name').text();
                    item_name = item_name.toLowerCase();

                    if (item_name.indexOf(search_input) != -1) {
                        jQuery(this).css("display", "grid").removeClass('hide');
                    } else {
                        jQuery(this).hide().addClass('hide');
                    }
                });

            } else {
                $this.find("ul.ufc-filter-result > li.ufc-filter-result-item").css("display", "grid").removeClass('hide');
            }
        }
    });

    /* Field Collections : Settings Tab Field Change: input, textarea, select */
    jQuery(document).on("change, keydown", ".ultimate-field-collections-content #ufc_field_data_tab_content .ufc-field-data-section-content #ufc_field_post_meta_form input, .ultimate-field-collections-content #ufc_field_data_tab_content .ufc-field-data-section-content #ufc_field_post_meta_form textarea, .ultimate-field-collections-content #ufc_field_data_tab_content .ufc-field-data-section-content #ufc_field_post_meta_form select", function (e) {
        ufcFormUnsaved = true;
    });

    jQuery(document).on("change", ".ultimate-field-collections-content #ufc_field_data_tab_content .ufc-field-data-section-content #ufc_field_post_meta_form input,.ultimate-field-collections-content #ufc_field_data_tab_content .ufc-field-data-section-content #ufc_field_post_meta_form select,.ultimate-field-collections-content #ufc_field_data_tab_content .ufc-field-data-section-content #ufc_field_post_meta_form textarea", function (e) {
        ufcFormUnsaved = true;
    });


    /* Field Collections : Settings Tab Field Input Change */
    jQuery(document).on("change, keydown", ".ultimate-field-collections-content #ufc_settings_tab_content .field-edit-view-wrap .field-edit-content-row input", function (e) {
        ufcFormUnsaved = true;
    });

    jQuery(document).on("change", ".ultimate-field-collections-content #ufc_settings_tab_content .field-edit-view-wrap .field-edit-content-row input", function (e) {
        ufcFormUnsaved = true;
    });

    /* Field Collections : Change Settings Tab Field Collection Name */
    jQuery(document).on("change, keydown", ".ultimate-field-collections-content .ufc-tab-content-header .ufc-collection-title input", function (e) {
        ufcFormUnsaved = true;
    });

    /* Field Collections : Create New Field Collection */
    jQuery(document).on("change, keydown", ".ultimate-field-collections-content-2 #ufc_create_field_collection_form input#Collection_Name", function (e) {
        ufcFormUnsaved = true;
    });

    /* Create Field Collection : Save New Field Collection */
    jQuery(document).on("click", ".ultimate-field-collections-content-2 #ufc_create_field_collection_form #ufc_create_field_collection_submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var field_collection_name = jQuery(".ultimate-field-collections-content-2 #ufc_create_field_collection_form #Collection_Name").val();

        if (field_collection_name.length == 0) {
            //alert("Collection Name is empty.");
            jQuery("#ufc_create_field_collection_form #Collection_Name").addClass('error');
            jQuery("#ufc_create_field_collection_form #Collection_Name").after('<span class="error_msg">This field is required.</span>');
            jQuery(".ultimate-field-collections-content-2 #ufc_create_field_collection_form #Collection_Name").focus();

        } else {

            jQuery("#ufc_create_field_collection_form #Collection_Name").removeClass('error');
            jQuery("#ufc_create_field_collection_form span.error_msg").remove();

            jQuery(".ultimate-field-collections-content").css("opacity", "1").css("pointer-events", "none");


            jQuery(".ultimate-field-collections-content").html('');
            // jQuery(".ultimate-field-collections-content").hide();
            // jQuery(".ultimate-field-collections-content-2").css("display", "flex");
            jQuery(".ultimate-field-collections-content-2 #ufc_create_field_collection_form #Collection_Name").val("");
            jQuery(".ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item").removeClass("ufc-select-field-group");

            var collection_link = UFC_Admin_Ajax.ufc_admin_page_url;
            window.history.pushState('', '', collection_link);

            ufcFormUnsaved = false;

            $.ajax({
                method: "post",
                url: UFC_Admin_Ajax.ajax_url,
                data: {
                    action: "ufc_create_field_group_submit",
                    field_collection_name: field_collection_name,
                    nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
                },
                success: function (response) {
                    response = JSON.parse(response);
                    jQuery(".ultimate-field-collections-content").css("opacity", "").css("pointer-events", "");
                    if (response.field_group_list_item_html) {
                        jQuery(".ultimate-field-collections-page-wrap .ultimate-field-collections-sidebar ul.ufc-fields-list-wrap").append(response.field_group_list_item_html);

                        if (response.save_field_group_id) {
                            if (jQuery('.ultimate-field-collections-page-wrap .ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item[data-field_group_id="' + response.save_field_group_id + '"]').length) {
                                jQuery('.ultimate-field-collections-page-wrap .ultimate-field-collections-sidebar ul.ufc-fields-list-wrap > li.ufc-field-list-item[data-field_group_id="' + response.save_field_group_id + '"]').trigger("click");
                            }
                        }
                    }
                },
            });
        }
    });

    /* Edited Field Collection : Show New Collection form */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-repeater.jpn-tabs-activated.jpn-horizontal .acf-input-wrap .ufc-repeater-table .jpn-acf-tabs ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav, .ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-repeater.jpn-tabs-activated.jpn-vertical .acf-input-wrap .ufc-repeater-table .jpn-acf-tabs ul.jpn-acf-tabs-nav li.jpn-acf-tab-nav", function (e) {
        // e.preventDefault();
        // e.stopPropagation();
        jQuery(this).parent("ul.jpn-acf-tabs-nav").find("li.jpn-acf-tab-nav").removeClass("active");
        jQuery(this).addClass("active");
        var tab_target_id = jQuery(this).attr("data-target_id");
        jQuery(this).closest(".ufc-repeater-list-head").parent(".ufc-repeater-table").children(".ufc-repeater-list-body").children(".acf-row").removeClass("active");
        if (
            jQuery(this)
                .closest(".ufc-repeater-list-head")
                .parent(".ufc-repeater-table")
                .children(".ufc-repeater-list-body")
                .children('.acf-row[data-id="' + tab_target_id + '"]').length
        ) {
            jQuery(this)
                .closest(".ufc-repeater-list-head")
                .parent(".ufc-repeater-table")
                .children(".ufc-repeater-list-body")
                .children('.acf-row[data-id="' + tab_target_id + '"]')
                .addClass("active");
        }
    });

    /* Relationship : Reload items (Search, filter) */
    jQuery(document).on("change", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-relationship > .acf-input .acf-relationship-wrap .filters.acf-relationship-head .filter.acf-relationship-filter-search input, .ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-relationship > .acf-input .acf-relationship-wrap .filters.acf-relationship-head .filter.acf-relationship-filter-post_type select, .ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-relationship > .acf-input .acf-relationship-wrap .filters.acf-relationship-head .filter.acf-relationship-filter-taxonomy select", function (e) {
        e.preventDefault();
        e.stopPropagation();

        relationship_create($(this));


    });

    function relationship_create(thisObj) {
        var relationship_wrap = jQuery(thisObj).closest(".acf-relationship-wrap");
        var acf_field_main = jQuery(thisObj).closest(".acf-field.acf-field-relationship");
        var search = relationship_wrap.find(".filters.acf-relationship-head .filter.acf-relationship-filter-search input").val();
        var post_type = relationship_wrap.find(".filters.acf-relationship-head .filter.acf-relationship-filter-post_type select").val();
        var taxonomy = relationship_wrap.find(".filters.acf-relationship-head .filter.acf-relationship-filter-taxonomy select").val();

        relationship_wrap.find(".selection > .choices > ul.choices-list").html('<li><i class="acf-loading"></i> Loading</li>');

        var ufc_relationship_filter_data = {
            taxonomy: taxonomy,
            post_type: post_type,
            paged: 1,
            s: search,
            max: "",
            min: "",
            action: "acf/fields/relationship/query",
            field_key: acf_field_main.attr("data-key"),
            post_id: acf_field_main.attr("data-ufc_field_post_id"),
            nonce: UFC_Admin_Ajax.acf_nonce,
        };

        $.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_relationship_filter_data,
            success: function (response) {
                var result_group_html = "";
                if (response.results) {

                    $.each(response.results, function (group_index, result_group) {

                        if (result_group.children) {

                            result_group_html += '<li><span class="acf-rel-label">';
                            result_group_html += result_group.text;
                            result_group_html += '</span><ul class="acf-bl">';
                            $.each(result_group.children, function (children_index, group_children) {
                                result_group_html += '<li><span class="acf-rel-item" data-id="';
                                result_group_html += group_children.id;
                                result_group_html += '">';
                                result_group_html += group_children.text;
                                result_group_html += "</span></li>";

                            });
                            result_group_html += "</ul></li>";

                        } else {
                            result_group_html += '<li><span class="acf-rel-item" data-id="';
                            result_group_html += result_group.id;
                            result_group_html += '">';
                            result_group_html += result_group.text;
                            result_group_html += "</span></li>";
                        }

                    });
                }
                relationship_wrap.find(".selection > .choices > ul.choices-list").html(result_group_html);

                setTimeout(function () {
                    if (relationship_wrap.find(".selection > .values  > ul.list .acf-rel-item").length) {
                        relationship_wrap.find(".selection > .values  > ul.list .acf-rel-item").each(function (index) {
                            var post_id = jQuery(thisObj).attr("data-id");
                            if (relationship_wrap.find('.choices .acf-rel-item[data-id="' + post_id + '"]').length) {
                                relationship_wrap.find('.choices .acf-rel-item[data-id="' + post_id + '"]').addClass("disabled");
                            }
                        });
                    }
                }, 1000);
            },
        });
    }

    /* Relationship : Select item */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-relationship > .acf-input .acf-relationship-wrap .choices ul.list li .acf-rel-item", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (jQuery(this).hasClass("disabled")) {
        } else {

            ufcFormUnsaved = true;

            jQuery(this).addClass("disabled");
            var post_id = jQuery(this).attr("data-id");
            var post_name = jQuery(this).text();
            var relationship_wrap = jQuery(this).closest(".acf-relationship-wrap");
            var acf_field_main = jQuery(this).closest(".acf-field.acf-field-relationship");
            var relationship_name = acf_field_main.find(".ufc_relationship_hidden_input").attr("name");

            var new_selected_post_html = "<li>";
            new_selected_post_html += '<input type="hidden" name="';
            new_selected_post_html += relationship_name;
            new_selected_post_html += '" value="';
            new_selected_post_html += post_id;
            new_selected_post_html += '" />';
            new_selected_post_html += '<span data-id="';
            new_selected_post_html += post_id;
            new_selected_post_html += '" class="acf-rel-item">';
            new_selected_post_html += post_name;
            new_selected_post_html += '<a href="#" class="acf-icon -minus small dark" data-name="remove_item"></a>';
            new_selected_post_html += "</span>";
            new_selected_post_html += "</li>";

            relationship_wrap.find(".values ul.values-list").append(new_selected_post_html);
        }
    });

    /* Relationship : Remove item */
    jQuery(document).on("click", ".ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-relationship .acf-relationship .values ul.list .acf-rel-item a.acf-icon", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var post_id = jQuery(this).closest(".acf-rel-item").attr("data-id");
        var relationship_wrap = jQuery(this).closest(".acf-relationship-wrap");
        var acf_field_main = jQuery(this).closest(".acf-field.acf-field-relationship");
        if (relationship_wrap.find('.choices .acf-rel-item[data-id="' + post_id + '"]').length) {
            relationship_wrap.find('.choices .acf-rel-item[data-id="' + post_id + '"]').removeClass("disabled");
        }
        jQuery(this).closest("li").remove();
    });

    /* Link Button : Open the Select link popup */
    jQuery(document).on("click", '.ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-link .acf-link a[data-name="add"], .ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-link .acf-link a[data-name="edit"]', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var link_wrap = jQuery(this).closest(".acf-link");
        var acf_field_main = jQuery(this).closest(".acf-field.acf-field-link");
        var acf_field_key = acf_field_main.attr("data-key");
        var link_title = link_wrap.find(".input-title").val();
        var link_target = link_wrap.find(".input-target").val();
        var link_url = link_wrap.find(".input-url").val();
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-backdrop").show();
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap").show();
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-key").val(acf_field_key);
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-url").val(link_url);
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-text").val(link_title);
        if (link_target == "_blank") {
            jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-target").prop("checked", true);
        } else {
            jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-target").prop("checked", false);
        }
    });

    /* Link Button : Delete the Link value */
    jQuery(document).on("click", '.ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-link .acf-link a[data-name="remove"]', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var link_wrap = jQuery(this).closest(".acf-link");
        var acf_field_main = jQuery(this).closest(".acf-field.acf-field-link");
        link_wrap.removeClass("-value -external");
        link_wrap.find(".link-wrap .link-title").html("");
        link_wrap.find(".link-wrap .link-url").attr("href", "").html("");

        link_wrap.find("a.link-node").html("");
        link_wrap.find("a.link-node").attr("href", "");
        link_wrap.find("a.link-node").attr("target", "");

        link_wrap.find(".input-title").val("");
        link_wrap.find(".input-target").val("");
        link_wrap.find(".input-url").val("").trigger("change");
    });

    /* Link Button : Save the Link value */
    jQuery(document).on("click", ".ultimate-field-collections-content .ufc-field-data-section-content #wp-link .submitbox #wp-link-submit", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var acf_field_key = jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-key").val();
        var link_url = jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-url").val();
        var link_title = jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-text").val();
        var link_target = "";
        var link_wrap_class = "-value";
        if (jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-target").is(":checked")) {
            link_target = "_blank";
            link_wrap_class += " -external";
        }

        if (jQuery('.ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-link[data-key="' + acf_field_key + '"]').length) {
            var acf_field_main = jQuery('.ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-link[data-key="' + acf_field_key + '"]');
            var link_wrap = acf_field_main.find(".acf-link");

            link_wrap.addClass(link_wrap_class);
            link_wrap.find(".link-wrap .link-title").html(link_title);

            if (link_title.length == 0) {
                link_wrap.find(".link-wrap .link-url").attr("href", link_url).html(link_url);
                link_wrap.find("a.link-node").html(link_url);
            } else {
                link_wrap.find(".link-wrap .link-url").attr("href", link_url).html(link_title);
                link_wrap.find("a.link-node").html(link_title);
            }

            link_wrap.find("a.link-node").attr("href", link_url);
            link_wrap.find("a.link-node").attr("target", link_target);

            link_wrap.find(".input-title").val(link_title);
            link_wrap.find(".input-target").val(link_target);
            link_wrap.find(".input-url").val(link_url).trigger("change");
        }
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-backdrop").hide();
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap").hide();
    });

    /* Link Button : Close the Link value */
    jQuery(document).on("click", ".ultimate-field-collections-content .ufc-field-data-section-content #wp-link li", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item_permalink = jQuery(this).find("input.item-permalink").val();
        var item_title = jQuery(this).find("span.item-title").html();
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-url").val(item_permalink);
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #wp-link-wrap #wp-link input#wp-link-text").val(item_title);
    });

    /* Taxonomy Create Term : Open the popup */
    jQuery(document).on("click", '.ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-taxonomy .acf-label .acf-actions span.acf-icon[data-name="add"]', function (e) {
        e.preventDefault();
        e.stopPropagation();
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup").show();
        var taxonomy_slug = jQuery(this).data("taxonomy_slug");
        var acf_field_main = jQuery(this).closest(".acf-field.acf-field-taxonomy");

        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box input#ufc_term_post_id").val(acf_field_main.attr("data-ufc_field_post_id"));
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box input#ufc_field_key").val(acf_field_main.attr("data-key"));
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box input#taxonomy_slug").val(taxonomy_slug);
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box .ufc-field input#term_name").val("");
        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box .ufc-field select#term_parent").html('<option value="" selected="selected" data-i="0">- Select -</option>');

        var ufc_taxonomy_data = {
            taxonomy_slug: taxonomy_slug,
            action: "ufc_field_get_add_taxonomy_options",
            field_key: acf_field_main.attr("data-key"),
            post_id: acf_field_main.attr("data-ufc_field_post_id"),
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
        };

        $.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_taxonomy_data,
            success: function (response) {
                response = JSON.parse(response);
                var result_html = '<option value="" selected="selected" data-i="0">- Select -</option>';
                if (response.results) {
                    $.each(response.results, function (term_id, term_name) {
                        result_html += '<option value="';
                        result_html += term_id;
                        result_html += '">';
                        result_html += term_name;
                        result_html += "</option>";
                    });
                }
                jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box .ufc-field select#term_parent").html(result_html);
            },
        });
    });

    /* Taxonomy Create Term : Save the popup and create the term */
    jQuery(document).on("click", ".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box .ufc-submit button#ufc_create_new_term", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var term_post_id = jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box input#ufc_term_post_id").val();
        var ufc_field_key = jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box input#ufc_field_key").val();
        var taxonomy_slug = jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box input#taxonomy_slug").val();
        var term_name = jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box .ufc-field input#term_name").val();
        var term_parent = jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup .ufc-taxonomy-popup-box .ufc-field select#term_parent").val();

        var ufc_taxonomy_data = {
            taxonomy_slug: taxonomy_slug,
            term_post_id: term_post_id,
            ufc_field_key: ufc_field_key,
            term_name: term_name,
            term_parent: term_parent,
            action: "ufc_field_add_new_taxonomy_term",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
        };

        $.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_taxonomy_data,
            success: function (response) {
                response = JSON.parse(response);
                if (response.success) {
                    alert(response.message);
                    var acf_field_main = jQuery('.ufc-field-data-section-content form#ufc_field_post_meta_form .acf-field.acf-field-taxonomy[data-key="' + ufc_field_key + '"]');
                    if (acf_field_main.length) {
                        var term_new_option_html = '<option value="';
                        term_new_option_html += response.term_id;
                        term_new_option_html += '">';
                        term_new_option_html += response.term_label;
                        term_new_option_html += "</option>";

                        if (response.term_parent && acf_field_main.find('.acf-input .acf-select-wrap select.ufc-field-view-select2 option[value="' + response.term_parent + '"]').length) {
                            acf_field_main.find('.acf-input .acf-select-wrap select.ufc-field-view-select2 option[value="' + response.term_parent + '"]').after(term_new_option_html);
                        } else {
                            acf_field_main.find(".acf-input .acf-select-wrap select.ufc-field-view-select2").append(term_new_option_html);
                        }
                        acf_field_main.find(".acf-input .acf-select-wrap select.ufc-field-view-select2").select2();
                        jQuery(".ultimate-field-collections-content .ufc-field-data-section-content #ufc-taxonomy-popup").hide();
                    }
                } else if (response.error) {
                    alert(response.error);
                }
            },
        });
    });

    /* Field Locations: Show the popup */
    jQuery(document).on("click", ".ufc-settings-actions-field-locations-action", function (e) {
        jQuery(".ultimate-field-collections-content").attr(
            {
                "data-collection_settings": "active"
            }
        );
    });

    /* Field Locations: Hide the popup */
    jQuery(document).on("click", ".ufc-close-field-locations", function (e) {
        jQuery(".ultimate-field-collections-content").attr(
            {
                "data-collection_settings": ""
            }
        );
    });

    // error

    /* Field Locations : Add condition */
    jQuery(document).on("click", ".ufc-settings-field-locations-box .ufc-field-loc-rules-group .ufc-field-loc-add-new-rule-row > span", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var btn_element = jQuery(this);
        var rules_group = btn_element.closest(".ufc-field-loc-rules-group");
        var rule_rows_wrap = rules_group.find(".ufc-field-loc-rule-rows-wrap");

        let field_location_rule_row_html = UFC_Admin_Ajax.field_location_rule_row_placeholder_html;
        var rule_key = "rule_" + $.now();
        var rule_group_key = rules_group.attr("data-rule_group_key");

        let new_field_location_rule_row_html = field_location_rule_row_html.replace(/UFC_Rule_Key/g, rule_key).replace(/UFC_Rule_Group_Key/g, rule_group_key);
        rule_rows_wrap.append(new_field_location_rule_row_html);
    });

    /* Field Locations : Add rule group */
    jQuery(document).on("click", ".ufc-settings-field-locations-box .ufc-field-loc-add-new-rules-group > .ufc_new_rule_group", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var btn_element = jQuery(this);
        var locations_box = btn_element.closest(".ufc-settings-field-locations-box");
        var rule_groups_wrap = locations_box.find(".ufc-field-locations-rules-wrap");

        var rule_key = "rule_" + $.now();
        var rule_group_key = "group_" + $.now();

        let field_location_rules_group_html = UFC_Admin_Ajax.field_location_rules_group_start_html + UFC_Admin_Ajax.field_location_rule_row_placeholder_html + UFC_Admin_Ajax.field_location_rules_group_end_html;

        let new_field_location_rules_group_html = field_location_rules_group_html.replace(/UFC_Rule_Key/g, rule_key).replace(/UFC_Rule_Group_Key/g, rule_group_key);
        rule_groups_wrap.append(new_field_location_rules_group_html);

        if (jQuery(".ufc-settings-field-locations-box .ufc-field-loc-rules-group").length) {
            var group_count = 0;
            jQuery(".ufc-settings-field-locations-box .ufc-field-loc-rules-group").each(function (index) {
                group_count++;
                jQuery(this).find("span.ufc-field-loc-rule-label span.ufc-field-loc-rule-number").html(group_count);
            });
        }
    });

    /* Field Locations : Remove rule row and role group */
    jQuery(document).on("click", ".ufc-settings-field-locations-box .ufc-field-loc-rules-group .ufc-field-loc-rule-row .ufc-field-loc-rule-remove .ufc-remove-location-rule", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(ufcDeleteConfirmationMessage) == false) {
            return false;
        }

        ufcFormUnsaved = true;

        var btn_element = jQuery(this);
        var rule_row = btn_element.closest(".ufc-field-loc-rule-row");
        var rule_rows_wrap = btn_element.closest(".ufc-field-loc-rule-rows-wrap");
        var rules_group = btn_element.closest(".ufc-field-loc-rules-group");
        rule_row.remove();
        if (rule_rows_wrap.find(".ufc-field-loc-rule-row").length == 0) {
            rules_group.remove();

            if (jQuery(".ufc-settings-field-locations-box .ufc-field-loc-rules-group").length) {
                var group_count = 0;
                jQuery(".ufc-settings-field-locations-box .ufc-field-loc-rules-group").each(function (index) {
                    group_count++;
                    jQuery(this).find("span.ufc-field-loc-rule-label span.ufc-field-loc-rule-number").html(group_count);
                });
            }
        }
    });

    /* Field Locations : Location rule operator options on change  */
    jQuery(document).on("change", ".ufc-settings-field-locations-box .ufc-field-loc-rules-group .ufc-field-loc-rule-row .ufc-field-loc-rule-operator select.location-rule-operator", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;
    });

    /* Field Locations : Location rule value options on change  */
    jQuery(document).on("change", ".ufc-settings-field-locations-box .ufc-field-loc-rules-group .ufc-field-loc-rule-row .ufc-field-loc-rule-value select.location-rule-value", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;
    });

    /* Field Locations : Get location rule value options on rule change  */
    jQuery(document).on("change", ".ufc-settings-field-locations-box .ufc-field-loc-rules-group .ufc-field-loc-rule-row .ufc-field-loc-rule-param select.refresh-location-rule", function (e) {
        e.preventDefault();
        e.stopPropagation();

        ufcFormUnsaved = true;

        var select_element = jQuery(this);
        var rule_row = select_element.closest(".ufc-field-loc-rule-row");
        var rules_group = select_element.closest(".ufc-field-loc-rules-group");

        var loc_rule_param = select_element.val();
        var loc_rule_operator = rule_row.find(".ufc-field-loc-rule-operator select.location-rule-operator").val();

        var ufc_location_rule_data = {
            loc_rule_param: loc_rule_param,
            loc_rule_operator: loc_rule_operator,
            action: "ufc_field_get_location_rule_value_options",
            nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
        };

        rule_row.find(".ufc-field-loc-rule-value select.location-rule-value").empty();

        $.ajax({
            method: "post",
            url: UFC_Admin_Ajax.ajax_url,
            data: ufc_location_rule_data,
            success: function (response) {
                response = JSON.parse(response);

                if (response.success) {
                    if (rule_row.find(".ufc-field-loc-rule-value select.location-rule-value").length) {
                        rule_row.find(".ufc-field-loc-rule-value select.location-rule-value").html(response.location_rule_value_options);
                    }
                } else if (response.error) {
                    alert(response.error);
                }
            },
        });
    });


    /** Field Collection Filters Added By DM **/

    jQuery(document).on("click", ".ufc-list-filters li a", function (e) {
        e.preventDefault();
        let $this = jQuery(this).parents(".ultimate-field-collections-sidebar");
        let target = jQuery(this).attr('data-target');
        $this.find(".ufc-list-filters li a").removeClass('current');
        jQuery(this).addClass('current');
        $this.find(".ufc-filter-result > li").addClass('hide');

        $this.find(".ufc-filter-result > li[data-status='" + target + "']").removeClass('hide').addClass('show').show();
        if (target == 'all') {
            $this.find(".ufc-filter-result > li").removeClass('hide').addClass('show').show();
        }
        if (target == 'starred') {
            $this.find(".ufc-filter-result > li[data-starred='1']").removeClass('hide').addClass('show').show();
        }

    });


    jQuery(document).on("click", ".ufc-filter-result-item .ufc-field-list-item-trigger-starred", function (e) {
        e.preventDefault();
        e.stopPropagation();

        let $this = jQuery(this).parents('.ultimate-field-collections-sidebar');
        let is_starred_tab = jQuery('.ufc-list-filters li.starred a.current').length;
        let star_query = $this.attr('data-star-query');
        let is_post = false;

        let post_id = jQuery(this).parents('.ufc-filter-result-item').attr('data-field_group_id');
        if (jQuery(this).parents('.ufc-filter-result-item').attr('data-field_post_id')) {
            post_id = jQuery(this).parents('.ufc-filter-result-item').attr('data-field_post_id');
            is_post = true;
        }

        let is_starred = jQuery(this).parents('.ufc-filter-result-item').attr('data-starred');
        if (is_starred == 1) {
            jQuery(this).parents('.ufc-filter-result-item').attr('data-starred', 0);
            if (is_starred_tab > 0) {
                jQuery(this).parents('.ufc-filter-result-item').removeClass('show').addClass('hide');
            }
        } else {
            jQuery(this).parents('.ufc-filter-result-item').attr('data-starred', 1);
        }

        jQuery(this).toggleClass("active");

        jQuery.ajax({
            type: "post",
            dataType: "json",
            url: UFC_Admin_Ajax.ajax_url,
            data: {
                action: "ufc_make_starred",
                ufc_field_group_id: post_id,
                is_post: is_post,
                star_query: star_query,
                nonce: UFC_Admin_Ajax.ufc_ajax_nonce
            },
            success: function (response) {
                if (response.type == "success") {
                    $this.find(".starred .count").html("(" + response.starred_count + ")");
                    if (response.starred_count > 0) {
                        $this.find(".starred").removeClass('no_starred');
                    } else {
                        $this.find(".starred").addClass('no_starred');
                        $this.find(".publish a").trigger('click');
                    }
                }
            }
        });

    });

    jQuery(document).on("click", ".acf-oembed .acf-actions a[data-name='clear-button']", function (e) {
        e.preventDefault();
        jQuery('.acf-field-oembed .acf-oembed .acf-input-wrap input').val("").change();
        jQuery('.acf-field-oembed .acf-oembed .acf-input-wrap').removeClass("has-value");
        jQuery('.ufc-group-custom-field-content-wrap .canvas-media').empty();
    });

    jQuery(document).on("change keyup paste", ".acf-field-oembed .acf-input-wrap input", function (e) {
        var value = jQuery(this).val();
        var key = jQuery(this).attr('data-key');
        var ufc_field_group_id = jQuery('#ufc_field_post_meta_form input[name="ufc_field_group_id"]').val();

        if (value) {
            jQuery('.acf-field-oembed .acf-oembed .acf-input-wrap').addClass("has-value");

            if (value.substr(0, 4) != 'http') {
                value = 'http://' + value;
            }

            jQuery.ajax({
                type: "post",
                dataType: "json",
                url: UFC_Admin_Ajax.ajax_url,
                data: {
                    action: "ufc_get_embedded",
                    ufc_field_group_id: ufc_field_group_id,
                    value: value,
                    key: key,
                    nonce: UFC_Admin_Ajax.ufc_ajax_nonce
                },
                success: function (response) {
                    jQuery('.ufc-group-custom-field-content-wrap .canvas-media').html(response.html);
                }
            });
        } else {
            jQuery('.acf-field-oembed .acf-oembed .acf-input-wrap').removeClass("has-value");
            jQuery('.ufc-group-custom-field-content-wrap .canvas-media').empty();
        }

    });

    jQuery('.ufc-slug-edit-wrap #edit-slug-box a').attr('target', '_blank');

    jQuery(document).ajaxComplete(function () {
        jQuery('.ufc-slug-edit-wrap #edit-slug-box a').attr('target', '_blank');
        jQuery('.acf-range-wrap [type=range]').on("input change", function () {
            var value = jQuery(this).val();
            jQuery(this).parents('.acf-range-wrap').find('[type="number"]').val(value);
        });
        jQuery("select.ufc-field-select2").select2({
            minimumResultsForSearch: -1
        });
    });

    jQuery(document).on("change", ".acf-button-group label input[type=radio]", function () {
        jQuery(this).parents('.acf-button-group').find('label').removeClass('selected');
        jQuery(this).parent().addClass('selected');
    });

    jQuery(document).on('click', '.ufc-tab-content .ultimate-field-collections-sidebar .filters .filter-trigger', function (e) {
        e.preventDefault();
        e.stopPropagation();

        jQuery(this).parents(".filters").toggleClass("active");
    });
    
    // jQuery(document).on('click', '.ufc-tab-content .ultimate-field-collections-sidebar .filters .filter-action-list', function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    // });
    
    jQuery(document).on('click', '.filtering .acf-radio-choices input', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var order = jQuery(this).parents('.acf-radio-choices').find('input').attr('data-order');
        if (jQuery(this).parents('.acf-radio-choices').hasClass('selected')) {
            if (order && order == 'desc') {
                jQuery(this).parents('.acf-radio-choices').find('input').attr('data-order', 'asc');
                jQuery(this).parents('.acf-radio-choices').attr('data-order', 'asc');
            } else {
                jQuery(this).parents('.acf-radio-choices').find('input').attr('data-order', 'desc');
                jQuery(this).parents('.acf-radio-choices').attr('data-order', 'desc');
            }
        }
        jQuery(this).change();
    });
    
    
    jQuery(document).on('change', '.filter-action-list input', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var ufc_field_group_id = jQuery('#ufc_settings_form input[name="ufc_field_group_id"]').val();
        var order_by = jQuery('.filter-action-list [name="sort"]:checked').val();
        var order = jQuery('.filter-action-list [name="sort"]:checked').attr('data-order');
        var curr_tab = jQuery('.ufc-field-data-section-wrap .ufc-list-filters li a.current').attr('data-target');
        var post_type = [];
    
        jQuery('.filter-action-list [name="post_type"]').each(function () {
            if (jQuery(this).is(':checked')) {
                post_type.push(jQuery(this).val());
            }
        });
    
        jQuery.ajax({
            type: "post",
            dataType: "json",
            url: UFC_Admin_Ajax.ajax_url,
            data: {
                action: "ufc_filtering_list",
                nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
                ufc_field_group_id: ufc_field_group_id,
                post_type: post_type,
                order_by: order_by,
                order: order,
            },
            success: function (response) {
                jQuery('#ufc_field_data_tab_content').html(response.html);
                jQuery('.ufc-field-data-section-wrap .ufc-list-filters li a[data-target="' + curr_tab + '"]').trigger('click');
                jQuery('.ufc-tab-content .ultimate-field-collections-sidebar .filters').addClass("active");
            }
        });
    });


    


    jQuery(document).on("click", ".ufc-content-header-wrap button#Add_New_Item", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }

        ufcFormUnsaved = false;

        var ufc_field_group_id = jQuery('#ufc_settings_form input[name="ufc_field_group_id"]').val();
        jQuery(".ufc-field-data-section-content").html('');
        jQuery(".ufc-field-posts-list-wrap li.ufc-field-post-list-item ").removeClass("ufc-select-field-group");
        jQuery(".ufc-add-new-item").addClass('active');


        var collection_link = UFC_Admin_Ajax.ufc_admin_page_url + '&collection=' + ufc_field_group_id + '&tab=content';
        window.history.pushState('', '', collection_link);

    });

    jQuery(document).on("click", ".ufc-add-new-item #ufc_create_item_cancel", function (e) {
        e.preventDefault();

        if (ufcFormUnsaved) {
            if (confirm(ufcFormUnsavedConfirmationMessage) == false) {
                return false;
            }
        }

        jQuery(".ufc-add-new-item").removeClass('active');
        jQuery('#ufc_create_post_form')[0].reset();
        jQuery('#ufc_create_post_form .ufc-settings-field #ufc_post_title').removeClass('error');
        jQuery('#ufc_create_post_form .ufc-settings-field .error_msg').remove();
        ufcFormUnsaved = false;
    });


    jQuery(document).on("click", ".ufc-add-new-item #ufc_create_item_submit", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ufc_field_group_id = jQuery('#ufc_settings_form input[name="ufc_field_group_id"]').val();
        var post_type = jQuery('.ufc-add-new-item #ufc_create_post_form [name="post_type"]').val();
        var post_title = jQuery('.ufc-add-new-item #ufc_create_post_form #ufc_post_title').val();
        if (post_title) {
            jQuery('#ufc_create_post_form .ufc-settings-field #ufc_post_title').removeClass('error');
            jQuery('#ufc_create_post_form .ufc-settings-field .error_msg').remove();
            jQuery.ajax({
                type: "post",
                dataType: "json",
                url: UFC_Admin_Ajax.ajax_url,
                data: {
                    action: "ufc_add_new_item",
                    nonce: UFC_Admin_Ajax.ufc_ajax_nonce,
                    ufc_field_group_id: ufc_field_group_id,
                    selected_post_type: post_type,
                    post_title: post_title,
                },
                success: function (response) {
                    jQuery('#ufc_field_data_tab_content').html(response.html);
                    jQuery('.ultimate-field-collections-sidebar.ufc-field-data-section-sidebar li.all a').trigger('click');
                    jQuery('.ultimate-field-collections-sidebar.ufc-field-data-section-sidebar .ufc-field-posts-list-wrap li[data-field_post_id="' + response.new_post + '"]').trigger('click');
                }
            });
        } else {
            jQuery('#ufc_create_post_form .ufc-settings-field #ufc_post_title').addClass('error');
            $('#ufc_create_post_form .ufc-settings-field #ufc_post_title').after('<span class="error_msg">This field is required.</span>');
        }

    });

    /** End Field Collection Filters Added By DM */


    function googleMapLoad(ufc_map_section_wrap_id, ufc_map_field_input_id, ufc_map_search_input_id, ufc_map_display_target_id, ufc_map_field_input_val) {

        var map_lat = -33.8688;
        var map_lng = 151.2195;
        var map_zoom = 13;

        if (ufc_map_field_input_val.length) {
            var ufc_map_field_input_val_obj = jQuery.parseJSON(ufc_map_field_input_val);

            if (ufc_map_field_input_val_obj.lat) {

                map_lat = ufc_map_field_input_val_obj.lat;
                map_lng = ufc_map_field_input_val_obj.lng;
                map_zoom = ufc_map_field_input_val_obj.zoom;
            }
        }

        // function initAutocomplete() {

        const map = new google.maps.Map(document.getElementById(ufc_map_display_target_id), {
            center: { lat: map_lat, lng: map_lng },
            zoom: map_zoom,
            mapTypeId: "roadmap",
        });

        // console.log('map=');
        // console.log(map);

        // Create the search box and link it to the UI element.
        const input = document.getElementById(ufc_map_search_input_id);
        const searchBox = new google.maps.places.SearchBox(input);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
            //ufcFormUnsaved = true;
        });

        let markers = [];

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            // console.log('places=');
            // console.log(places);
            if (places.length == 0) {
                return;
            }

            ufcFormUnsaved = true;

            // Clear out the old markers.
            markers.forEach((marker) => {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();

            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    // console.log("Returned place contains no geometry");
                    return;
                }

                const icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                };

                // Set the location array into field value.
                if (place.geometry) {
                    place.formatted_address = jQuery('#' + ufc_map_search_input_id).val();
                    var place_val = googleMapParseResult(place, map);
                    jQuery('#' + ufc_map_field_input_id).val(JSON.stringify(place_val)); // Searching a custom address will return an empty PlaceResult object.
                } else if (place.name) {
                    // this.searchAddress(place.name);
                }
                // Create a marker for each place.
                markers.push(
                    new google.maps.Marker({
                        map,
                        icon,
                        title: place.name,
                        position: place.geometry.location,
                    })
                );
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

        // }
    }
    /**
     * parseResult
     *
     * Returns location data for the given GeocoderResult object.
     *
     * @date	15/10/19
     * @since	5.8.6
     *
     * @param	object obj A GeocoderResult object.
     * @return	object
     */
    function googleMapParseResult(obj, map_obj) {
        // Construct basic data.
        var result = {
            address: obj.formatted_address,
            lat: obj.geometry.location.lat(),
            lng: obj.geometry.location.lng()
        }; // Add zoom level.

        result.zoom = map_obj.getZoom(); // Add place ID.

        if (obj.place_id) {
            result.place_id = obj.place_id;
        } // Add place name.


        if (obj.name) {
            result.name = obj.name;
        } // Create search map for address component data.


        var map = {
            street_number: ['street_number'],
            street_name: ['street_address', 'route'],
            city: ['locality', 'postal_town'],
            state: ['administrative_area_level_1', 'administrative_area_level_2', 'administrative_area_level_3', 'administrative_area_level_4', 'administrative_area_level_5'],
            post_code: ['postal_code'],
            country: ['country']
        }; // Loop over map.

        for (var k in map) {
            var keywords = map[k]; // Loop over address components.

            for (var i = 0; i < obj.address_components.length; i++) {
                var component = obj.address_components[i];
                var component_type = component.types[0]; // Look for matching component type.

                if (keywords.indexOf(component_type) !== -1) {
                    // Append to result.
                    result[k] = component.long_name; // Append short version.

                    if (component.long_name !== component.short_name) {
                        result[k + '_short'] = component.short_name;
                    }
                }
            }
        }
        /**
         * Filters the parsed result.
         *
         * @date	18/10/19
         * @since	5.8.6
         *
         * @param	object result The parsed result value.
         * @param	object obj The GeocoderResult object.
         */
        return result;
    }

});
