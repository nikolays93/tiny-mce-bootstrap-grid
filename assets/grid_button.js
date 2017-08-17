/* global tinymce */
( function() {
    tinymce.PluginManager.add( 'grid_shortcode', function( editor, link ) {
        editor.addButton( 'grid_shortcode', {
            text: '',
            type: 'button',
            icon: 'screenoptions dashicons-screenoptions',
            title: 'Вставить сетку',
            onclick: function() {
                editor.windowManager.open({
                    title : 'Вставить сетку',
                    body: [
                    {
                        type       : 'textbox',
                        subtype    : 'number',
                        min        : 1,
                        max        : 12,
                        name       : 'cols',
                        label      : 'Количество столбцов',
                        value      : '4',
                    },
                    {
                        type       : 'textbox',
                        subtype    : 'number',
                        min        : 1,
                        name       : 'rows',
                        label      : 'Количество строк',
                        value      : '1',
                    },
                    // {
                    //  type       : 'checbox',
                    //  name       : 'responsive',
                    //  label      : 'Адаптивность',
                    //  // placeholder: '1',
                    // },
                    ],
                    onsubmit : function( e ){
                        var content = '';
                        var col_class = '';
                        var columns_count = e.data.rows * e.data.cols;

                        switch ( parseInt(e.data.cols) ) {
                            case 12:    col_class = 'col-1';    break;
                            case 6:     col_class = 'col-2';    break;
                            case 5:     col_class = 'col-2-4';  break;
                            case 4:     col_class = 'col-3';    break;
                            case 3:     col_class = 'col-4';    break;
                            case 2:     col_class = 'col-6';    break;
                            case 1:     col_class = 'col-12';   break;
                            default:    col_class = 'col-3';    break;
                        }

                        content+= '<div class="row">';
                        for (var i = 0; i < columns_count; i++) {
                            content+= '<div class="'+col_class+'">';
                            content+= i + 1;
                            content+= '</div>';
                        }
                        content+= '</div>';
                        content+= '\n';
                        content+= '&nbsp;';

                        editor.insertContent( content );
                    }
                });
            }
        });

        editor.on( 'init', function () {
            var styleID = editor.dom.uniqueId();

            var scriptElm = editor.dom.create( 'link', {
                id: styleID,
                rel: 'stylesheet',
                type: 'text/css',
                href:  '../wp-content/plugins/tiny-mce-bootstrap-grid/assets/mce-grid.min.css'
            } );

            editor.getDoc().getElementsByTagName( 'head' )[ 0 ].appendChild( scriptElm );
        } );

        //List of bootstrap elements not to delete
        var bootstrapClassesStr = '.col-1,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-10,.col-11,.col-12';
        //var bootstrapElements = bootstrapClassesStr.slice(1).split(',.');

        editor.on('keydown', function(evt) {
            var currentNode = editor.selection.getNode();
            var field = currentNode.closest(bootstrapClassesStr);
            if( field ){
                if( evt.keyCode == 8 || evt.keyCode == 46 ){
                    var ret = 0;
                    var startOffset = editor.selection.getRng().startOffset;

                    var selected = editor.selection.getContent();
                    var fieldText = '';
                    if( field ){
                            fieldText = field.textContent.replace("\r", "")
                                                       .replace("\n", "")
                                                       .replace("↵", "");
                    }
                    // debug
                    // console.log({startOffset : startOffset, fieldText : fieldText.length,
                    //     selected : selected.length, keyCode : evt.keyCode, field : field });
                    if( field.innerHTML.length == selected.length ){
                        // console.log('Удаление всего выделенного контента backspace\'ом или delete\'ом');
                        ret = 2;
                    }

                    // backspace
                    if ( evt.keyCode == 8 && startOffset == "1" &&
                        selected.length == 0 && fieldText.length == 1 ){
                        // console.log('Удаление последнего элемента backspace\'ом');
                        ret = 2;
                    }

                    // delete
                    if ( evt.keyCode == 46){
                        if(startOffset == "0" && fieldText.length == 1){
                            // console.log('Удаление последнего элемента delete\'ом');
                            ret = 2;
                        }
                        if( currentNode.innerHTML.length == startOffset  ){
                            // console.log('Удаление следующего элемента, так как за кареткой пусто');
                            ret = 1;
                        }
                    }

                    if(ret){
                        evt.preventDefault();
                        evt.stopPropagation();
                        if(ret == 2){
                            field.innerHTML = '&nbsp;';
                        }
                        return false;
                    }
                }
            }
        });

    });
})();
