jQuery(function ($) {

    $("#mainForm").submit(function (e) {
        e.preventDefault();
        document.querySelector('button[name="submit"]').disabled = true;

        let data = {
            'firstname': document.querySelector('input[name="firstname"]').value,
            'lastname': document.querySelector('input[name="lastname"]').value,
            'email': document.querySelector('input[name="email"]').value,
            'phone': iti.getNumber(),
            'iso': document.querySelector('input[name="iso"]').value,
            'ip': document.querySelector('input[name="ip"]').value,
            'affiliate_id': getUrlParameter('affiliate_id'),
            'click_id': getUrlParameter('sub2'),
            'sub_id_8': getUrlParameter('sub_id_8'),
            'MPC_1': getUrlParameter('MPC_1'),
        }

        axios({
            method: 'POST',
            url: 'send.php',
            data: data,
        }).then((response) => {
            var result = JSON.parse(response.data);
            console.log(result);
            if (result.status == false) {

                alert(result.data);
                document.querySelector('button[name="submit"]').disabled = false;

            } else {
            
                var body = document.getElementsByTagName('body')[0];

                if (getUrlParameter('sub_id_8') !== undefined) {
                    var fb_frame = document.createElement('iframe');
                    fb_frame.src = 'https://www.facebook.com/tr?id=' + getUrlParameter('sub_id_8') + '&ev=Lead';
                    fb_frame.style.width = '1px';
                    fb_frame.style.height = '1px';
                    fb_frame.style.display = 'none';
                    body.append(fb_frame);
                }
                let post_iframe = document.createElement('iframe');
                let subid = getUrlParameter('subid')
                post_iframe.src = "//savagemedia.pro/d6ae847/postback?subid="+subid+"&status=lead"
                post_iframe.style.width = '1px';
                post_iframe.style.height = '1px';
                body.append(post_iframe);

                setTimeout(function () {
                    window.open(result.data, "_top")
                }, 2000);
            }
        })
    })

});
