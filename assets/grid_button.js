/* global tinymce */
( function() {
    tinymce.PluginManager.add( 'grid_shortcode', function( editor ) {
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
    });
})();
