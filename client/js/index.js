$(document).ready(function () {
    $('#afterin').hide()
    $('.form-signin').hide()
    $('.form-signup').hide()


    $('#mylist').click(function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: 'http://localhost:3000/todo/findTodo',
            method: 'POST',
            headers: {
                token
            }
        }).done(response => {
            $('#todos-list').empty()
            for (let i = 0; i < response.data.length; i++) {
                let list = response.data[i]
                let date = String(response.data[i].due_date).substr(0, 10)
                let status = response.data[i].status
                let realStatus;
                if (status == 'Undone') {
                    realStatus = '<i class="fas fa-times"></i>'
                } else {
                    realStatus = '<i class="fas fa-check"></i>'
                }
                let insert = `<div class ="kotak"  style="  border-top: 1px solid #0002;
                border-bottom: 1px solid  #0002;"> <h5 class="filter">${list.name}</h5> 
                <p>${list.description}</p>
                <p onclick="upstatus()" style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" data-status ="${list.status}" class="edited" >Edit ${realStatus}</p> 
                <p><i class="far fa-calendar-alt"></i> ${date}</p>
                <i style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" class="fas fa-trash fa-sm" onclick="del()"></i>
                </div>`
                $('#todos-list').prepend(insert);
            }

        })
    })


    let month = new Date().getUTCMonth() + 1;
    let day = new Date().getUTCDate();
    let year = new Date().getUTCFullYear();
    if (Number(day) >= 10 && Number(month) >= 10) {
        newdate = year + "-" + month + "-" + day;
    } else if (Number(day) < 10 && Number(month) >= 10) {
        newdate = year + "-" + month + "-" + '0' + day;
    } else if (Number(day) >= 10 && Number(month) < 10) {
        newdate = year + "-" + '0' + month + "-" + day;
    }



    $('#myDate').attr("min", newdate);

    $('#homepage').click(function () {
        $('.form-signin').show()
        $('#awal').hide()
        $('.form-signup').hide()
    })


    $('#signup').click(function () {
        $('.form-signin').hide()
        $('#awal').hide()
        $('.form-signup').show()
    })

    $('#updata').click(function () {
        $.ajax({
            url: 'http://localhost:3000/user/register',
            method: 'POST',
            data: {
                name: $('#regName').val(),
                email: $('#regEmail').val(),
                password: $('#regPassword').val()
            }
        }).done(data => {
            $('.form-signin').show()
            $('#awal').hide()
            $('.form-signup').hide()
        }).fail(function (jqXHR, textStatus) {
            console.log('Error:', textStatus);
        })
    })

    $("#find").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#todos-list .kotak").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function signIn() {
    $.ajax({
        url: 'http://localhost:3000/user/signin',
        method: 'POST',
        data: {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        }
    }).done(data => {
        localStorage.setItem('token', data.token)
        let token = data.token
        $('.form-signin').hide()
        $('.form-signup').hide()
        $('#awal').hide()
        $('#afterin').show()
        $.ajax({
            url: 'http://localhost:3000/todo/getProfile',
            method: 'POST',
            headers: {
                token
            }
        }).done(profile => {
            $('#top-right').prepend(`<i class="fas fa-list"></i> ${profile.name}`)
        })
    }).fail(function (jqXHR, textStatus) {
        console.log('Error:', textStatus);
    });
}

function onSignIn(googleUser) {
    let idToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/user/Gsignin',
        method: 'POST',
        data: {
            idToken
        }
    }).done(response => {
        localStorage.setItem('token', response.token)
        $.ajax({
            url: 'http://localhost:3000/todo/getProfile',
            method: 'POST',
            headers: {
                token
            }
        }).done(profile => {
            $('#top-right').prepend(`<i class="fas fa-list">${profile.name}</i> iTodo`)
        })
    }).fail(function (jqXHR, textStatus) {
        console.log('Error:', textStatus);
    });
    $('.form-signin').hide()
    $('.form-signup').hide()
    $('#awal').hide()
    $('#afterin').show()

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        $('#out').hide()
        $('#awal').show()
        $('.form-signin').hide()
        $('.form-signup').hide()
        $('#afterin').hide()
        localStorage.removeItem('token')
    });
}

function create() {
    event.preventDefault();
    let token = localStorage.getItem('token')
    $.ajax({
            url: 'http://localhost:3000/todo/createTodo',
            method: 'POST',
            headers: {
                token
            },
            data: {
                name: $('#regname').val(),
                description: $('#regdescription').val(),
                due_date: $('#myDate').val()
            },
        })
        .done(function (newList) {
            let list = newList.data2
            let date = String(newList.data2.due_date).substr(0, 10)
            let status = newList.data2.status
            let realStatus;
            if (status == 'Undone') {
                realStatus = '<i class="fas fa-times"></i>'
            } else {
                realStatus = '<i class="fas fa-check"></i>'
            }
            let insert = `<div class ="kotak"  style="  border-top: 1px solid #0002;
            border-bottom: 1px solid  #0002;"> <h5 class="filter">${list.name}</h5> 
            <p>${list.description}</p>
            <p onclick="upstatus()" style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" data-status ="${list.status}" class="edited" >Edit ${realStatus}</p> 
            <p><i class="far fa-calendar-alt"></i> ${date}</p>
            <i style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" class="fas fa-trash fa-sm" onclick="del()"></i>
            </div>`
            $('#todos-list').prepend(insert);
        })
        .fail(function (jqXHR, textStatus) {
            console.log('Error:', textStatus);
        });
}

function del() {
    $('.fas.fa-trash.fa-sm').attr('id', 'del')
    let id = $('.fas.fa-trash.fa-sm').attr('data-id')
    let token = localStorage.getItem('token')
    $.ajax({
            url: 'http://localhost:3000/todo/deleteTodo',
            method: 'POST',
            headers: {
                token
            },
            data: {
                id
            }
        }).done(response => {

        })
        .fail(function (jqXHR, textStatus) {
            console.log('Error:', textStatus);
        });
}

function upstatus() {
    $('.edited').attr('id', 'edit')
    let id = $('.edited').attr('data-id')
    let status = $('.edited').attr('data-status')
    let token = localStorage.getItem('token')
    let changeStatus;
    if (status == 'Undone') {
        changeStatus = 'Done'
    } else if(status == 'Done') {
        changeStatus = 'Undone'
    }
    $.ajax({
            url: 'http://localhost:3000/todo/updateStatusTodo',
            method: 'POST',
            headers: {
                token
            },
            data: {
                id,
                status: changeStatus
            }
        }).done(response => {
        })
        .fail(function (jqXHR, textStatus) {
            console.log('Error:', textStatus);
        });
}
