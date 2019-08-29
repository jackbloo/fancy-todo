$(document).ready(function () {
    if (localStorage.getItem('token')) {
        $('.form-signin').hide()
        $('.form-signup').hide()
        $('#afterin').show()
        $('#awal').hide()
        getTodo()
    } else {
        $('#afterin').hide()
        $('.form-signin').hide()
        $('.form-signup').hide()
        $('#awal').show()

    }


    $('#mylist').click(function () {
        getTodo()
    })

    $('#donelist').click(function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: 'http://35.198.251.14/todo/donelist',
            method: 'GET',
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
    $('#unlist').click(function () {
        let token = localStorage.getItem('token')
        $.ajax({
            url: 'http://35.198.251.14/todo/undonelist',
            method: 'GET',
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
            url: 'http://35.198.251.14/user/register',
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
    Swal.fire({
        title: 'Loggin in...',
        allowOutsideClick: () => !Swal.isLoading()
    })
    Swal.showLoading()
    $.ajax({
        url: 'http://35.198.251.14/user/signin',
        method: 'POST',
        data: {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        }
    }).done(data => {
        Swal.close()
        Swal.fire("Success!", "Your are Logged in!", "success");
        localStorage.setItem('token', data.token)
        $.ajax({
            url: 'http://35.198.251.14/todo/getProfile',
            method: 'GET',
            headers: {
                token: localStorage.token
            }
        }).done(profile => {
            $('#top-right').prepend(`<i class="fas fa-list"></i> ${profile.name}`)
            $('.form-signin').hide()
            $('.form-signup').hide()
            $('#awal').hide()
            $('#afterin').show()
            getTodo()
        })
    }).fail(function (jqXHR, textStatus) {
        Swal.fire("Error!", textStatus, "error");
    });
}

function onSignIn(googleUser) {
    let idToken = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://35.198.251.14/user/Gsignin',
        method: 'POST',
        data: {
            idToken
        }
    }).done(response => {
        localStorage.setItem('token', response.token)
        token = localStorage.getItem('token')
        $.ajax({
            url: 'http://35.198.251.14/todo/getProfile',
            method: 'GET',
            headers: {
                token
            }
        }).done(profile => {
            $('#top-right').prepend(`<i class="fas fa-list">${profile.name}</i>`)
            $('.form-signin').hide()
            $('.form-signup').hide()
            $('#awal').hide()
            $('#afterin').show()
            getTodo()
        })

    }).fail(function (jqXHR, textStatus) {
        Swal.fire("Error!", textStatus, "error");
    });


}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    Swal.fire({
        title: 'logging out...',
        allowOutsideClick: () => !Swal.isLoading()
    })
    Swal.showLoading()
    auth2.signOut().then(function () {
        Swal.close()
        Swal.fire("Success!", "Your are logged out!", "success");
        console.log('User signed out.');
        $('#out').hide()
        $('#awal').show()
        $('.form-signin').hide()
        $('.form-signup').hide()
        $('#afterin').hide()
        localStorage.removeItem('token')
    });
    Swal.close()
    Swal.fire("Success!", "Your are logged out!", "success");
    $('#out').hide()
    $('#awal').show()
    $('.form-signin').hide()
    $('.form-signup').hide()
    $('#afterin').hide()
    localStorage.removeItem('token')
}

function create() {
    event.preventDefault();
    let token = localStorage.getItem('token')
    Swal.fire({
        title: 'Creating your todo...',
        allowOutsideClick: () => !Swal.isLoading()
    })
    Swal.showLoading()
    $.ajax({
            url: 'http://35.198.251.14/todo/createTodo',
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
            Swal.close()
            Swal.fire("Success!", "Your Todo is Created!", "success");
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
            Swal.fire("Error!", textStatus, "error");;
        });
}

function del() {
    $('.fas.fa-trash.fa-sm').attr('id', 'del')
    let id = $('.fas.fa-trash.fa-sm').attr('data-id')
    let token = localStorage.getItem('token')
    Swal.fire({
        title: 'Deleting your Todo...',
        allowOutsideClick: () => !Swal.isLoading()
    })
    Swal.showLoading()
    $.ajax({
            url: 'http://35.198.251.14/todo/deleteTodo',
            method: 'DELETE',
            headers: {
                token
            },
            data: {
                id
            }
        }).done(response => {
            Swal.close()
            Swal.fire("Success!", "Your Todo is Deleted!", "success");
            getTodo()
        })
        .fail(function (jqXHR, textStatus) {
            Swal.fire("Error!", textStatus, "error");
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
    } else if (status == 'Done') {
        changeStatus = 'Undone'
    }
    Swal.fire({
        title: 'Updating your todo...',
        allowOutsideClick: () => !Swal.isLoading()
    })
    Swal.showLoading()
    $.ajax({
            url: 'http://35.198.251.14/todo/updateStatusTodo',
            method: 'PATCH',
            headers: {
                token
            },
            data: {
                id,
                status: changeStatus
            }
        }).done(response => {
            Swal.close()
            Swal.fire("Success!","Your Account is Updated!", "success");
            getTodo()
        })
        .fail(function (jqXHR, textStatus) {
            Swal.fire("Error!", textStatus, "error");
        });
}

function backToSignIn() {
    $('#afterin').hide()
    $('.form-signin').show()
    $('.form-signup').hide()
}


function profile() {
    let token = localStorage.getItem('token')
    $.ajax({
            url: 'http://35.198.251.14/todo/getProfile',
            method: 'GET',
            headers: {
                token
            }
        }).done(profile => {
            $('#myId').empty()
            $('.container2').hide()
            $('#myId').show()
            let datenow = new Date()
            let datestr = String(datenow).substr(0, 10)
            let insert = `<i class="fas fa-user"></i>
            <h2>Hello, ${profile.name}<h2>
            <h4>${datestr}<h4>
            <a href="#" onclick="backTocreate()">Create Todo</p>`
            $('#myId').prepend(insert)
        })
        .fail(function (jqXHR, textStatus) {
            console.log('Error:', textStatus);
        });
}

function backTocreate() {
    $('.container2').show()
    $('#myId').hide()
}

function getTodo() {
    let token = localStorage.getItem('token')
    $.ajax({
        url: 'http://35.198.251.14/todo/findTodo',
        method: 'GET',
        headers: {
            token
        }
    }).done(response => {
        $('#todos-list').empty()
        for (let i = 0; i < response.data.length; i++) {
            let list = response.data[i]
            let targetDate = new Date(response.data[i].due_date)
            let date = String(response.data[i].due_date).substr(0, 10)
            let status = response.data[i].status
            let today = new Date()
            let realStatus;
            if (status == 'Undone') {
                realStatus = '<i class="fas fa-times"></i>'
            } else {
                realStatus = '<i class="fas fa-check"></i>'
            }

            let checkDate;
            if (targetDate < today) {
                checkDate = `<p class="red"><i class="far fa-calendar-alt"></i> ${date}</p>`
            } else if (targetDate >= today) {
                checkDate = `<p><i class="far fa-calendar-alt"></i> ${date}</p>`
            }

            let insert = `<div class ="kotak"  style="  border-top: 1px solid #0002;
            border-bottom: 1px solid  #0002;"> <h5 class="filter">${list.name}</h5> 
            <p>${list.description}</p>
            <p onclick="upstatus()" style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" data-status ="${list.status}" class="edited" >Edit ${realStatus}</p> 
            ${checkDate}
            <i style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" class="fas fa-trash fa-sm" onclick="del()"></i>
            </div>`
            $('#todos-list').prepend(insert);
        }

    })
}