<?php
// Global variables
global $ufc_admin;

$response = array();

if ( !empty($_POST['_acf_nonce']) && wp_verify_nonce( sanitize_text_field($_POST['_acf_nonce']), 'ufc_post_meta' ) ) {

	if ( !empty($_POST['_acf_post_id']) ) {

		$ufc_submited_data = $ufc_admin->ufc_field_post_data_sanitize_array($_POST);

		/* echo '<pre>';
		print_r( $ufc_submited_data );
		echo '</pre>'; */

		if ( !empty($ufc_submited_data['acf']) ) {
			// Start Lavel-1
			foreach ($ufc_submited_data['acf'] as $acf_key => $acf_value) {

				// Unset the data of Repeater Clone section
				if ( in_array( $acf_key, array('row-ufchtrepeatercloneindex', 'row-ufcvtrepeatercloneindex', 'row-ufcarepeatercloneindex', 'row-acfcloneindex') ) || (str_contains($acf_key, 'ufc_repeater_clone_index')) ) {
					unset( $ufc_submited_data['acf'][$acf_key] );

				} else {

					if ( !empty($acf_value) && is_array($acf_value) ) {
						// Start Lavel-2
						foreach ($acf_value as $acf_key_l2 => $acf_value_l2) {
							
							// Unset the data of Repeater Clone section
							if ( in_array( $acf_key_l2, array('row-ufchtrepeatercloneindex', 'row-ufcvtrepeatercloneindex', 'row-ufcarepeatercloneindex', 'row-acfcloneindex'), true ) || (str_contains($acf_key_l2, 'ufc_repeater_clone_index')) ) {
								unset( $ufc_submited_data['acf'][$acf_key][$acf_key_l2] );

							} else {

								if ( !empty($acf_value_l2) && is_array($acf_value_l2) ) {
									// Start Lavel-3
									foreach ($acf_value_l2 as $acf_key_l3 => $acf_value_l3) {

										// Unset the data of Repeater Clone section
										if ( in_array( $acf_key_l3, array('row-ufchtrepeatercloneindex', 'row-ufcvtrepeatercloneindex', 'row-ufcarepeatercloneindex', 'row-acfcloneindex') ) || (str_contains($acf_key_l3, 'ufc_repeater_clone_index')) ) {
											unset( $ufc_submited_data['acf'][$acf_key][$acf_key_l2][$acf_key_l3] );

										} else {

											if ( !empty($acf_value_l3) && is_array($acf_value_l3) ) {
												// Start Lavel-4
												foreach ($acf_value_l3 as $acf_key_l4 => $acf_value_l4) {

													// Unset the data of Repeater Clone section
													if ( in_array( $acf_key_l4, array('row-ufchtrepeatercloneindex', 'row-ufcvtrepeatercloneindex', 'row-ufcarepeatercloneindex', 'row-acfcloneindex') ) || (str_contains($acf_key_l4, 'ufc_repeater_clone_index')) ) {
														unset( $ufc_submited_data['acf'][$acf_key][$acf_key_l2][$acf_key_l3][$acf_key_l4] );

													} else {

														if ( !empty($acf_value_l4) && is_array($acf_value_l4) ) {
															// Start Lavel-5
															foreach ($acf_value_l4 as $acf_key_l5 => $acf_value_l5) {

																// Unset the data of Repeater Clone section
																if ( in_array( $acf_key_l5, array('row-ufchtrepeatercloneindex', 'row-ufcvtrepeatercloneindex', 'row-ufcarepeatercloneindex', 'row-acfcloneindex') ) || (str_contains($acf_key_l5, 'ufc_repeater_clone_index')) ) {
																	unset( $ufc_submited_data['acf'][$acf_key][$acf_key_l2][$acf_key_l3][$acf_key_l4][$acf_key_l5] );

																} else {

																	if ( !empty($acf_value_l5) && is_array($acf_value_l5) ) {
																		// Start Lavel-6
																		foreach ($acf_value_l5 as $acf_key_l6 => $acf_value_l6) {

																			// Unset the data of Repeater Clone section
																			if ( in_array( $acf_key_l6, array('row-ufchtrepeatercloneindex', 'row-ufcvtrepeatercloneindex', 'row-ufcarepeatercloneindex', 'row-acfcloneindex') ) || (str_contains($acf_key_l6, 'ufc_repeater_clone_index')) ) {
																				unset( $ufc_submited_data['acf'][$acf_key][$acf_key_l2][$acf_key_l3][$acf_key_l4][$acf_key_l5][$acf_key_l6] );

																			} else {

																				if ( !empty($acf_value_l6) && is_array($acf_value_l6) ) {
																					// Start Lavel-7
																					foreach ($acf_value_l6 as $acf_key_l7 => $acf_value_l7) {

																						// Unset the data of Repeater Clone section
																						if ( in_array( $acf_key_l7, array('row-ufchtrepeatercloneindex', 'row-ufcvtrepeatercloneindex', 'row-ufcarepeatercloneindex', 'row-acfcloneindex') ) || (str_contains($acf_key_l7, 'ufc_repeater_clone_index')) ) {
																							unset( $ufc_submited_data['acf'][$acf_key][$acf_key_l2][$acf_key_l3][$acf_key_l4][$acf_key_l5][$acf_key_l6][$acf_key_l7] );

																						} else {

																							if ( !empty($acf_value_l7) && is_array($acf_value_l7) ) {
																								// Start Lavel-8
																								foreach ($acf_value_l7 as $acf_key_l8 => $acf_value_l8) {

																									// Unset the data of Repeater Clone section
																									if ( in_array( $acf_key_l8, array('row-ufchtrepeatercloneindex', 'row-ufcvtrepeatercloneindex', 'row-ufcarepeatercloneindex', 'row-acfcloneindex') ) || (str_contains($acf_key_l8, 'ufc_repeater_clone_index')) ) {
																										unset( $ufc_submited_data['acf'][$acf_key][$acf_key_l2][$acf_key_l3][$acf_key_l4][$acf_key_l5][$acf_key_l6][$acf_key_l7][$acf_key_l8] );

																									} else {
																										// Lavel-9
																										if ( !empty($acf_value_l8) && is_array($acf_value_l8) ) {
																										}
																									}
																								}
																								// END Lavel-8
																							}
																						}
																					}
																					// END Lavel-7
																				}
																			}
																		}
																		// END Lavel-6
																	}
																}
															}
															// END Lavel-5
														}
													}
												}
												// END Lavel-4
											}
										}
									}
									// END Lavel-3
								}
							}
						}
						// END Lavel-2
					}
				}
			}
			// End Lavel-1
		}

		// May have been posted. Remove slashes.
		$ufc_submited_data = wp_unslash( $ufc_submited_data );
		$_POST = $ufc_submited_data;

		
		/* echo '<pre>';
		print_r( $ufc_submited_data );
		echo '</pre>'; */

		do_action('acf/save_post', $ufc_submited_data['_acf_post_id']);

		// Update post title
		$ufc_post_data = array(
			'ID'           => $ufc_submited_data['_acf_post_id'],
			'post_title'   => $ufc_submited_data['ufc_post_title_input'],
			'post_name'    => $ufc_submited_data['ufc_post_name_input'],
		);
		// Update the post into the database
		wp_update_post( $ufc_post_data );

		$response['success'] = 1;

	} else {
		$response['error'] = 1;
	}
}
echo json_encode($response);
exit;