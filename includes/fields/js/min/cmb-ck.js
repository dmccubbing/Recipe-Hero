window.CMB=function(e,t,i,r){"use strict";var a=e.cmb_l10,n=e.setTimeout,o={formfield:"",idNumber:!1,file_frames:{},repeatEls:'input:not([type="button"]),select,textarea,.cmb_media_status'};return o.metabox=function(){return o.$metabox?o.$metabox:(o.$metabox=i("table.cmb_metabox"),o.$metabox)},o.init=function(){var t=o.metabox(),r=t.find(".repeatable-group");a.new_admin_style&&t.find(".cmb-spinner img").hide(),o.initPickers(t.find("input:text.cmb_timepicker"),t.find("input:text.cmb_datepicker"),t.find("input:text.cmb_colorpicker")),i("#ui-datepicker-div").wrap('<div class="cmb_element" />'),i('<p><span class="button cmb-multicheck-toggle">'+a.check_toggle+"</span></p>").insertBefore("ul.cmb_checkbox_list"),t.on("change",".cmb_upload_file",function(){o.formfield=i(this).attr("id"),i("#"+o.formfield+"_id").val("")}).on("click",".cmb-multicheck-toggle",o.toggleCheckBoxes).on("click",".cmb_upload_button",o.handleMedia).on("click",".cmb_remove_file_button",o.handleRemoveMedia).on("click",".add-group-row",o.addGroupRow).on("click",".add-row-button",o.addAjaxRow).on("click",".remove-group-row",o.removeGroupRow).on("click",".remove-row-button",o.removeAjaxRow).on("keyup paste focusout",".cmb_oembed",o.maybeOembed).on("cmb_remove_row",".repeatable-group",o.resetTitlesAndIterator),r.length&&r.filter(".sortable").each(function(){i(this).find(".remove-group-row").before('<a class="shift-rows move-up alignleft" href="#">'+a.up_arrow+'</a> <a class="shift-rows move-down alignleft" href="#">'+a.down_arrow+"</a>")}).on("click",".shift-rows",o.shiftRows).on("cmb_add_row",o.emptyValue),n(o.resizeoEmbeds,500),i(e).on("resize",o.resizeoEmbeds)},o.resetTitlesAndIterator=function(){i(".repeatable-group").each(function(){var e=i(this);e.find(".repeatable-grouping").each(function(t){var r=i(this);r.data("iterator",t),r.find(".cmb-group-title h4").text(e.find(".add-group-row").data("grouptitle").replace("{#}",t+1))})})},o.toggleCheckBoxes=function(e){e.preventDefault();var t=i(this),r=t.parents("td").find("input[type=checkbox]");t.data("checked")?(r.prop("checked",!1),t.data("checked",!1)):(r.prop("checked",!0),t.data("checked",!0))},o.handleMedia=function(e){if(wp){e.preventDefault();var t=o.metabox(),r=i(this);o.formfield=r.prev("input").attr("id");var n=i("#"+o.formfield),l=n.attr("name"),s=!0,d=!0,c=r.hasClass("cmb_upload_list");if(o.formfield in o.file_frames)return void o.file_frames[o.formfield].open();o.file_frames[o.formfield]=wp.media.frames.file_frame=wp.media({title:t.find("label[for="+o.formfield+"]").text(),button:{text:a.upload_file},multiple:c?!0:!1});var f={list:function(e){d=e.toJSON(),n.val(d.url),i("#"+o.formfield+"_id").val(d.id);var t=[];i(d).each(function(){s=this.type&&"image"===this.type?'<li class="img_status"><img width="50" height="50" src="'+this.url+'" class="attachment-50x50" alt="'+this.filename+'"><p><a href="#" class="cmb_remove_file_button" rel="'+o.formfield+"["+this.id+']">'+a.remove_image+'</a></p><input type="hidden" id="filelist-'+this.id+'" name="'+l+"["+this.id+']" value="'+this.url+'"></li>':"<li>"+a.file+" <strong>"+this.filename+'</strong>&nbsp;&nbsp;&nbsp; (<a href="'+this.url+'" target="_blank" rel="external">'+a.download+'</a> / <a href="#" class="cmb_remove_file_button" rel="'+o.formfield+"["+this.id+']">'+a.remove_file+'</a>)<input type="hidden" id="filelist-'+this.id+'" name="'+l+"["+this.id+']" value="'+this.url+'"></li>',t.push(s)}),i(t).each(function(){n.siblings(".cmb_media_status").slideDown().append(this)})},single:function(e){d=e.first().toJSON(),n.val(d.url),i("#"+o.formfield+"_id").val(d.id),s=d.type&&"image"===d.type?'<div class="img_status"><img style="max-width: 350px; width: 100%; height: auto;" src="'+d.url+'" alt="'+d.filename+'" title="'+d.filename+'" /><p><a href="#" class="cmb_remove_file_button" rel="'+o.formfield+'">'+a.remove_image+"</a></p></div>":a.file+" <strong>"+d.filename+'</strong>&nbsp;&nbsp;&nbsp; (<a href="'+d.url+'" target="_blank" rel="external">'+a.download+'</a> / <a href="#" class="cmb_remove_file_button" rel="'+o.formfield+'">'+a.remove_file+"</a>)",n.siblings(".cmb_media_status").slideDown().html(s)}};o.file_frames[o.formfield].on("select",function(){var e=o.file_frames[o.formfield].state().get("selection"),t=c?"list":"single";f[t](e)}),o.file_frames[o.formfield].open()}},o.handleRemoveMedia=function(e){e.preventDefault();var t=i(this);if(t.is(".attach_list .cmb_remove_file_button"))return t.parents("li").remove(),!1;o.formfield=t.attr("rel");var r=t.parents(".img_status");return o.metabox().find("input#"+o.formfield).val(""),o.metabox().find("input#"+o.formfield+"_id").val(""),r.length?r.html(""):t.parents(".cmb_media_status").html(""),!1},i.fn.replaceText=function(e,t,r){return this.each(function(){var a=this.firstChild,n,o,l=[];if(a)do 3===a.nodeType&&(n=a.nodeValue,o=n.replace(e,t),o!==n&&(!r&&/</.test(o)?(i(a).before(o),l.push(a)):a.nodeValue=o));while(a=a.nextSibling);l.length&&i(l).remove()})},i.fn.cleanRow=function(e,t){var r=i(this),a=r.find('input:not([type="button"]), select, textarea, label');return t&&r.find(".cmb-repeat-table .repeat-row:not(:first-child)").remove(),o.$focus=!1,o.neweditor_id=[],a.filter(":checked").removeAttr("checked"),a.filter(":selected").removeAttr("selected"),r.find(".cmb-group-title").length>0&&r.find(".cmb-group-title h4").text(r.data("title").replace("{#}",o.idNumber+1)),a.each(function(){var t=i(this),r=t.hasClass("wp-editor-area"),a=t.attr("for"),n={},l,s;if(a)n={"for":a.replace("_"+e,"_"+o.idNumber)};else{var d=t.attr("name"),c=d?d.replace("["+e+"]","["+o.idNumber+"]"):"";s=t.attr("id"),l=s?s.replace("_"+e,"_"+o.idNumber):"",n={id:l,name:c,"data-iterator":o.idNumber}}if(t.removeClass("hasDatepicker").attr(n).val(""),r){l=l?s.replace("zx"+e,"zx"+o.idNumber):"",t.html("");var f=t.parents(".cmb-type-wysiwyg");f.find(".mce-tinymce:not(:first-child)").remove();var p=f.html().replace(new RegExp(s,"g"),l);f.html(p),o.neweditor_id.push({id:l,old:s})}o.$focus=o.$focus?o.$focus:t}),this},i.fn.newRowHousekeeping=function(){var e=i(this),t=e.find(".wp-picker-container"),r=e.find(".cmb_media_status");return t.length&&t.each(function(){var e=i(this).parent();e.html(e.find("input:text.cmb_colorpicker").attr("style",""))}),r.length&&r.empty(),this},o.afterRowInsert=function(e){o.$focus&&o.$focus.focus();var t;if(o.neweditor_id.length){var i;for(i=o.neweditor_id.length-1;i>=0;i--){var r=o.neweditor_id[i].id,a=o.neweditor_id[i].old;if("undefined"==typeof tinyMCEPreInit.mceInit[r]){var n=jQuery.extend({},tinyMCEPreInit.mceInit[a]);for(t in n)"string"==typeof n[t]&&(n[t]=n[t].replace(new RegExp(a,"g"),r));tinyMCEPreInit.mceInit[r]=n}if("undefined"==typeof tinyMCEPreInit.qtInit[r]){var l=jQuery.extend({},tinyMCEPreInit.qtInit[a]);for(t in l)"string"==typeof l[t]&&(l[t]=l[t].replace(new RegExp(a,"g"),r));tinyMCEPreInit.qtInit[r]=l}tinyMCE.init({id:tinyMCEPreInit.mceInit[r]})}}o.initPickers(e.find("input:text.cmb_timepicker"),e.find("input:text.cmb_datepicker"),e.find("input:text.cmb_colorpicker"))},o.updateNameAttr=function(){var e=i(this),t=e.attr("name");if("undefined"==typeof t)return!1;var r=parseInt(e.parents(".repeatable-grouping").data("iterator")),a=r-1,n=t.replace("["+r+"]","["+a+"]");e.attr("name",n)},o.emptyValue=function(e,t){i('input:not([type="button"]), textarea',t).val("")},o.addGroupRow=function(e){e.preventDefault();var t=i(this),r=i("#"+t.data("selector")),a=r.find(".repeatable-grouping").last(),n=parseInt(a.data("iterator"));o.idNumber=n+1;var l=a.clone();l.data("title",t.data("grouptitle")).newRowHousekeeping().cleanRow(n,!0);var s=i('<tr class="repeatable-grouping" data-iterator="'+o.idNumber+'">'+l.html()+"</tr>");a.after(s),o.afterRowInsert(s),r.find(".repeatable-grouping").length<=1?r.find(".remove-group-row").prop("disabled",!0):r.find(".remove-group-row").removeAttr("disabled"),r.trigger("cmb_add_row",s)},o.addAjaxRow=function(e){e.preventDefault();var t=i(this),r="#"+t.data("selector"),a=i(r),n=a.find(".empty-row"),l=parseInt(n.find("[data-iterator]").data("iterator"));o.idNumber=l+1;var s=n.clone();s.newRowHousekeeping().cleanRow(l),n.removeClass("empty-row").addClass("repeat-row"),n.after(s),o.afterRowInsert(s),a.trigger("cmb_add_row",s)},o.removeGroupRow=function(e){e.preventDefault();var t=i(this),r=i("#"+t.data("selector")),a=t.parents(".repeatable-grouping"),n=r.find(".repeatable-grouping").length;a.nextAll(".repeatable-grouping").find(o.repeatEls).each(o.updateNameAttr),n>1&&(a.remove(),3>n?r.find(".remove-group-row").prop("disabled",!0):r.find(".remove-group-row").prop("disabled",!1),r.trigger("cmb_remove_row"))},o.removeAjaxRow=function(e){e.preventDefault();var t=i(this),r=t.parents("tr"),a=t.parents(".cmb-repeat-table");a.find("tr").length>1&&(r.hasClass("empty-row")&&r.prev().addClass("empty-row").removeClass("repeat-row"),t.parents(".cmb-repeat-table tr").remove(),a.trigger("cmb_remove_row"))},o.shiftRows=function(e){e.preventDefault();var t=i(this),r=t.parents(".repeatable-grouping"),a=t.hasClass("move-up")?r.prev(".repeatable-grouping"):r.next(".repeatable-grouping");if(a.length){var n=[];r.find(o.repeatEls).each(function(){var e=i(this),t;e.hasClass("cmb_media_status")?t=e.html():"checkbox"===e.attr("type")?(t=e.is(":checked"),o.log("checked",t)):"select"===e.prop("tagName")?(t=e.is(":selected"),o.log("checked",t)):t=e.val(),n.push({val:t,$:e})}),a.find(o.repeatEls).each(function(e){var t=i(this),r;t.hasClass("cmb_media_status")?(r=t.html(),t.html(n[e].val),n[e].$.html(r)):"checkbox"===t.attr("type")?(n[e].$.prop("checked",t.is(":checked")),t.prop("checked",n[e].val)):"select"===t.prop("tagName")?(n[e].$.prop("selected",t.is(":selected")),t.prop("selected",n[e].val)):(n[e].$.val(t.val()),t.val(n[e].val))})}},o.initPickers=function(e,t,i){o.initTimePickers(e),o.initDatePickers(t),o.initColorPickers(i)},o.initTimePickers=function(e){e.length&&e.timePicker({startTime:"00:00",endTime:"23:59",show24Hours:!1,separator:":",step:30})},o.initDatePickers=function(e){e.length&&(e.datepicker("destroy"),e.datepicker())},o.initColorPickers=function(e){e.length&&("object"==typeof jQuery.wp&&"function"==typeof jQuery.wp.wpColorPicker?e.wpColorPicker():e.each(function(e){i(this).after('<div id="picker-'+e+'" style="z-index: 1000; background: #EEE; border: 1px solid #CCC; position: absolute; display: block;"></div>'),i("#picker-"+e).hide().farbtastic(i(this))}).focus(function(){i(this).next().show()}).blur(function(){i(this).next().hide()}))},o.maybeOembed=function(e){var t=i(this),r=e.type,a={focusout:function(){n(function(){o.spinner(".postbox table.cmb_metabox",!0)},2e3)},keyup:function(){var i=function(t,i){return e.which<=i&&e.which>=t};(i(48,90)||i(96,111)||i(8,9)||187===e.which||190===e.which)&&o.doAjax(t,e)},paste:function(){n(function(){o.doAjax(t)},100)}};a[r]()},o.resizeoEmbeds=function(){o.metabox().each(function(){var e=i(this),t=e.parents(".inside");if(!t.length)return!0;var r=Math.round(.82*t.width()*.97)-30;if(r>639)return!0;var a=e.find(".cmb-type-oembed .embed_status"),n=a.children().not(".cmb_remove_wrapper");return n.length?void n.each(function(){var e=i(this),t=e.width(),a=e.height(),n=r;e.parents(".repeat-row").length&&(n=r-91);var o=Math.round(n*a/t);e.width(n).height(o)}):!0})},o.log=function(){a.script_debug&&console&&"function"==typeof console.log&&console.log.apply(console,arguments)},o.spinner=function(e,t){t?i(".cmb-spinner",e).hide():i(".cmb-spinner",e).show()},o.doAjax=function(e){var t=e.val();if(!(t.length<6)){var r=e.attr("id"),l=e.parents(".cmb-repeat-table  tr td");l=l.length?l:e.parents(".cmb_metabox tr td");var s=i(".embed_status",l),d=e.width(),c=i(":first-child",s);o.log("oembed_url",t,r),d=s.length&&c.length?c.width():e.width(),o.spinner(l),i(".embed_wrap",l).html(""),n(function(){i(".cmb_oembed:focus").val()===t&&i.ajax({type:"post",dataType:"json",url:a.ajaxurl,data:{action:"cmb_oembed_handler",oembed_url:t,oembed_width:d>300?d:300,field_id:r,object_id:e.data("objectid"),object_type:e.data("objecttype"),cmb_ajax_nonce:a.ajax_nonce},success:function(e){o.log(e),"undefined"!=typeof e.id&&(o.spinner(l,!0),i(".embed_wrap",l).html(e.result))}})},500)}},i(t).ready(o.init),o}(window,document,jQuery);