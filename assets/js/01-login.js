$(function () {
    $('#link_reg').click(function () {
        //点击 去注册  login-box盒子隐藏 reg-box盒子显示
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击 去登录  login-box盒子显示 reg-box盒子隐藏
    $('#link_login').click(function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //密码验证 自动校验
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //value：表单的值
            if (value != $('.reg-box input[name=password]').val()) {
                return '两次输入的密码不一致'
            }
        }

    })

    //注册
    let layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        //阻止默认提交事件
        e.preventDefault();
        //发送ajax
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                // 提示成功
                layer.msg(res.message, { icon: 6 })
                //切换 回到 登录
                $('#link_login').click();
                //清空 注册页面信息
                $('#form_reg')[0].reset()
            }
        })
    })
    //登录
    $('#form_login').on('submit', function (e) {
        //阻止默认提交事件
        e.preventDefault();
        //发送ajax
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                //判断 
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                //登录成功跳转页面
                location.href = '/01-index.html';
                //保存token 身份验证的令牌
                localStorage.setItem('token', res.token)

            }
        })
    })





})
