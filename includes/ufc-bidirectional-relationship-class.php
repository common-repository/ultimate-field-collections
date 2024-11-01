<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Bidirectional Relationship Class
 *
 * Handles adding scripts functionality to the Bidirectional Relationship fields
 *
 * @package Ultimate Field Collections
 * @since 1.0.0
 */
class UFC_Bidirectional_Relationship {

	//class constructor
	function __construct(){
	}
        
    public function ufc_setup_bidirectional_relationship() {
        $acf_version = acf_get_setting('version');
        if (version_compare($acf_version, '5.0.0', '<')) {
            return;
        } else {
            add_filter('acf/update_value/type=relationship', array($this, 'ufc_update_relationship_field'), 11, 3);
            add_filter('acf/update_value/type=post_object', array($this, 'ufc_update_relationship_field'), 11, 3);
        }
    } // end public function ufc_setup_bidirectional_relationship

    public function ufc_update_relationship_field($value, $post_id, $field) {
        $update = true;
        $update = apply_filters('acf/post2post/update_relationships/default', $update);
        $update = apply_filters('acf/post2post/update_relationships/key='.$field['key'], $update);
        if (!$update) {
            return $value;
        }
        $updated_posts = array();
        $field_name = $field['name'];
        $previous = maybe_unserialize(get_post_meta($post_id, $field_name, true));
        if ($previous === '') {
            $previous = array();
        }
        if (!is_array($previous)) {
            $previous = array($previous);
        }
        $previous = array_map('intval', $previous);
        // get new value
        $new = $value;
        if (!$new) {
            $new = array();
        }
        if (!is_array($new)) {
            $new = array($new);
        }
        if (count($previous)) {
            foreach ($previous as $related_id) {
                if (!in_array($related_id, $new)) {
                    $this->ufc_remove_relationship($related_id, $field_name, $post_id);
                    $updated_posts[] = $related_id;
                }
            }
        }
        if (count($new)) {
            foreach ($new as $related_id) {
                $this->ufc_add_relationship($related_id, $field_name, $post_id);
                $updated_posts[] = $related_id;
            }
        }
        if (count($updated_posts)) {
            do_action('acf/post2post/relationships_updated', $updated_posts, $field_name, $new, $previous);
        }
        return $value;
    } // end public function ufc_update_relationship_field
    
    private function ufc_remove_relationship($post_id, $field_name, $related_id) {
        /*
            $post_id = the post id to remove the relationship from
            $field_name = the field name to update
            $related_id = the relationship to remove 
        */
        $field = $this->ufc_get_field($post_id, $field_name);
        if (!$field) {
            // field not found attached to this post
            return;
        }
        $array_value = true;
        if ($field['type'] == 'post_object') {
            if (!$field['multiple']) {
                $array_value = false;
            }
        }
        $values = maybe_unserialize(get_post_meta($post_id, $field_name, true));
        if ($values === '') {
            $values = array();
        }
        if (!is_array($values)) {
            $values = array($values);
        }
        if (!count($values)) {
            // nothing to delete
            return;
        }
        $values = array_map('intval', $values);
        $new_values = array();
        foreach ($values as $value) {
            if ($value != $related_id) {
                $new_values[] = $value;
            }
        }
        if (!count($new_values) && !$array_value) {
            $new_values = '';
        } elseif (!$array_value) {
            $new_values = $new_values[0];
        } elseif (count($new_values)) {
            $new_values = array_map('strval', $new_values);
        }
        update_post_meta($post_id, $field_name, $new_values);
        update_post_meta($post_id, '_'.$field_name, $field['key']);
        do_action('acf/post2post/relationship_updated', $post_id, $field_name, $new_values);
    } // end private function ufc_remove_relationship
    
    private function ufc_add_relationship($post_id, $field_name, $related_id) {
        /*
            $post_id = the post id to add the relationship to
            $field_name = the field name to update
            $related_id = the relationship to add 
        */
        $field = $this->ufc_get_field($post_id, $field_name);
        if (!$field) {
            // field not found attached to this post
            return;
        }
        $max_posts = 0;
        $array_value = true;
        if ($field['type'] == 'post_object') {
            if (!$field['multiple']) {
                $max_posts = 1;
                $array_value = false;
            }
        } elseif ($field['type'] == 'relationship') {
            if ($field['max']) {
                $max_posts = $field['max'];
            }
        }
        $value = maybe_unserialize(get_post_meta($post_id, $field_name, true));
        if ($value == '') {
            $value = array();
        }
        if (!is_array($value)) {
            $value = array($value);
        }
        $value = array_map('intval', $value);
        if (($max_posts == 0 || count($value) < $max_posts) &&
                !in_array($related_id, $value)) {
            $append_where = 'append';
            $append_where = apply_filters('acf/post2post/append-prepend', $append_where); // all field
            $append_where = apply_filters('acf/post2post/append-prepend/name='.$field['name'], $append_where); // field name
            $append_where = apply_filters('acf/post2post/append-prepend/key='.$field['key'], $append_where); // field key
            if ($append_where == 'append') {
                $value[] = $related_id;
            } else {
                array_unshift($value, $related_id);
            }
        } elseif ($max_posts > 0) {
            $overwrite_settings = apply_filters('acf-post2post/overwrite-settings', array());
            if (isset($overwrite_settings[$field_name]) && 
                isset($overwrite_settings[$field_name]['overwrite']) &&
                $overwrite_settings[$field_name]['overwrite']) {
                $type = 'first';
                if (isset($overwrite_settings[$field_name]['type']) && 
                        in_array(strtolower($overwrite_settings[$field_name]['type']), array('first', 'last'))) {
                    $type = strtolower($overwrite_settings[$field_name]['type']);
                }
                if ($type == 'first') {
                    $remove = array_shift($value);
                } else {
                    $remove = array_pop($value);
                }
                // remove this relationship from the post that was just removed
                $this->ufc_remove_relationship(intval($remove), $field_name, $post_id);
                $append_where = 'append';
                $append_where = apply_filters('acf/post2post/append-prepend', $append_where); // all field
                $append_where = apply_filters('acf/post2post/append-prepend/name='.$field['name'], $append_where); // field name
                $append_where = apply_filters('acf/post2post/append-prepend/key='.$field['key'], $append_where); // field key
                if ($append_where == 'append') {
                    $value[] = $related_id;
                } else {
                    array_unshift($value, $related_id);
                }
            } // end field overwrite
        } // end if else
        if (!$array_value) {
            $value = $value[0];
        } else {
            $value = array_map('strval', $value);
        }
        update_post_meta($post_id, $field_name, $value);
        update_post_meta($post_id, '_'.$field_name, $field['key']);
        do_action('acf/post2post/relationship_updated', $post_id, $field_name, $value);
    } // end private function ufc_add_relationship
    
    public function ufc_get_field($post_id, $field_name) {
        $field = false;
        $found = false;
        $cache_key = 'get_field-'.$post_id.'-'.$field_name;
        $cache = wp_cache_get($cache_key, 'acfpost2post', false, $found);
        if ($found) {
            return $cache;
        }
        $found = false;
        $field_groups = $this->ufc_post_field_groups($post_id);
        $field_group_count = count($field_groups);
        for ($g=0; $g<$field_group_count; $g++) {
            $field_count = count($field_groups[$g]['fields']);
            for ($f=0; $f<$field_count; $f++) {
                if ($field_groups[$g]['fields'][$f]['name'] == $field_name &&
                    in_array($field_groups[$g]['fields'][$f]['type'], array('relationship', 'post_object'))) {
                    $field = $field_groups[$g]['fields'][$f];
                    $found == true;
                    break;
                }
            } // end for $f
            if ($found) {
                break;
            }
        } // end for $g
        wp_cache_set($cache_key, $field, 'acfpost2post');
        return $field;
    } // end public function ufc_get_field
    
    public function ufc_post_field_groups($post_id) {
        $found = false;
        $cache = wp_cache_get('post_field_groups-'.$post_id, 'acfpost2post', false, $found);
        if ($found) {
            return $cache;
        }
        $args = array('post_id' => $post_id);
        $field_groups = acf_get_field_groups($args);
        $count = count($field_groups);
        for ($i=0; $i<$count; $i++) {
            $field_groups[$i]['fields'] = acf_get_fields($field_groups[$i]['key']);
        }
        wp_cache_set('post_field_groups-'.$post_id, $field_groups, 'acfpost2post');
        return $field_groups;
    } // end public function ufc_post_field_groups

    /**
     * Adding Hooks
     *
     * @package Ultimate Field Collections
     * @since 1.0.0
     */
    function add_hooks(){
        add_action('after_setup_theme', array($this, 'ufc_setup_bidirectional_relationship'));
    }
}