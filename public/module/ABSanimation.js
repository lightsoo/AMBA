/**
 * Created by JiSoo on 2016-11-05.
 */
define ([], function() {
    var animationQueue = [];
    var target;
    var curId;
    var module = {
        init: function(dv, getId) {
            target = dv;
            curId = getId;
        },
        import: function(aq) {
            if (aq === undefined || typeof aq !== 'object') {
                animationQueue = [];
                return;
            }
            animationQueue = aq;
        },
        export: function() {
            return animationQueue;
        },
        append: function() {
            var i;
            var params = ['duration', 'easing', 'complete'];

            function editParams(dv, param) {
                var root = div().appendTo(dv).size('100%', 30).marginTop(15);
                div().appendTo(root).size('30%', '100%').text(param +': ').fontBold();
                var edit = div().id('abs-ani-'+param).appendTo(root).size('40%', '75%').color('white').text('').editable().borderRadius(2)
                    .border('2px solid black').cursorText().textAlignLeft().keypress(function(dv, e) {
                        if (e.which == 13) {
                            input.trigger('click');
                            e.preventDefault();
                            return false;
                        }
                    }).click(function(dv, e) {
                        e.stopPropagation();
                        e.preventDefault();
                    });

                var input = div().appendTo(root).size('20%', '75%').color('#cccccc').text('OK').fontBold()
                    .textAlignCenter().cursorPointer().hoverColor('gray', '#cccccc').border('2px solid black').click(function(dv, e) {
                        e.stopPropagation();
                        e.preventDefault();

                        if(param === 'complete') {
                            var aniData = {
                                id: curId(), // Current ID를 반환, 없으면 undefined
                                params: getArgs()
                            };
                            animationQueue.push(aniData);
                        } else {
                            params.forEach(function (data) {
                                if (data === param)
                                    $('#abs-ani-' + params[params.indexOf(data)+1]).data('div').$text.focus();
                            });
                        }
                    });

                function getArgs() {
                    var args = {};
                    params.forEach(function (data) {
                        args[data] = parseFloat($('#abs-ani-'+data).data('div').text()) || undefined;
                    });

                    return args;
                }
            }

            var root = div().appendTo(target).size('100%', '100%').border('2px solid black').selectable(false);
            div().appendTo(root).size('100%', '6%').color('black').text('AMBASA - Animation').fontColor('white').fontSize(20).textAlignCenter().border('2px solid gray');

            var decoContent = function(dv) {
                dv.appendTo(body).size('100%', 'auto').textAlignCenter().fontBold().border('2px solid black').cursorPointer();
            };

            var body = div().appendTo(root).size('100%', '94%');
            var fadeIn = div().deco(decoContent).text('Fade In').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                ani_fadein.trigger('click');
                $('#abs-ani-duration').data('div').$text.focus();
            });
            var fadeOut = div().deco(decoContent).text('Fade Out').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                ani_fadeout.trigger('click');
            });
            var slideDown = div().deco(decoContent).text('slide Down').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                ani_slidedown.trigger('click');
            });
            var slideUp = div().deco(decoContent).text('Slide Up').click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                ani_slideup.trigger('click');
            });


            var ani_fadein = div().id('abs-ani-fadein').appendTo(fadeIn).displayNone().size('100%', 150).click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                dv.slideToggle(300);
            });

            for(i=0; i<params.length; i++)
                editParams(ani_fadein, params[i]);

            var ani_fadeout = div().id('abs-ani-fadeout').appendTo(fadeOut).displayNone().size('100%', 150).click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                dv.slideToggle(300);
            });

            for(i=0; i<params.length; i++)
                editParams(ani_fadeout, params[i]);

            var ani_slidedown = div().id('abs-ani-slidedown').appendTo(slideDown).displayNone().size('100%', 150).click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                dv.slideToggle(300);
            });

            for(i=0; i<params.length; i++)
                editParams(ani_slidedown, params[i]);

            var ani_slideup = div().id('abs-ani-slideup').appendTo(slideUp).displayNone().size('100%', 150).click(function(dv, e) {
                e.stopPropagation();
                e.preventDefault();

                dv.slideToggle(300);
            });

            for(i=0; i<params.length; i++)
                editParams(ani_slideup, params[i]);
        },
        animationManager: function() {
            var iter = 0;
            var manager = {
                next: function() {
                    return animationQueue[iter++];
                },
                hasNext: function() {

                },
                back: function() {

                },
                hasBack: function() {

                },
                react: function() {

                },
                lastact: function() {

                }
            };

            return manager;
        },
        animator: function(selector) {

        }
    };

    return module;
});