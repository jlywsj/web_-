var h = 0;

$(window).load(function () {
    $('.time').click(function () {
        changeSubject($('.time'));
    });

    $('ul li a').click();

    h = $('.context').css('height');

    let cls = ['home.html', 'improve.html', 'custom.html', 'liberature.html', 'newyear.html', 'author.html'];
    let a = $('ul li a');
    // console.log(a);
    for (let i = 0; i < a.length; i++) {
        $(a[i]).attr({ 'refer': cls[i] });
    }

    var flag = true;

    $('ul li a').on('click', function () {
        clearClass();
        $(this).addClass('select');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if ($(this).attr('refer') == 'newyear.html' || $(this).attr('refer') == 'author.html') {
            if (flag) {
                $('body').css('overflow', 'hidden');
                $('.context').css('height', h);
                $('.main').css('height', '110%');
                $('footer').css('display', 'none');
                flag = false;
            }
        }
        else {
            if ($(this).attr('refer') == 'improve.html') {
                $('.context').css('height', $(window).height() + 'px');
            } else {
                $('.context').attr('style', '');
            }

            $('body').css('overflow', 'scroll');
            setTimeout(function () {
                $('.main').css('height', '100%');
                $('.indexbox .context').height(document.querySelector('iframe').contentDocument.body.clientHeight + 20);
            }, 30);

            $('footer').css('display', 'block');
            flag = true;
        }
        $('iframe').attr('src', $(this).attr('refer'));
        return false;
    });

    $('.logo img').on('click',function(){
        $('ul li a')[0].click();
    });

    $('.href').off('click');

});

function clearClass() {
    $('ul li a').removeClass('select');
}