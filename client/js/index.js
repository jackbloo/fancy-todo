$(document).ready(function () {
    if (localStorage.getItem('token')) {
        $('.form-signin').hide()
        $('.form-signup').hide()
        $('#afterin').show()
        $('#awal').hide()
        getTodo()
        getProjects()
        getAllUsers()
        pageAwal()
        dateValidation()
    } else {
        $('#afterin').hide()
        $('.form-signin').hide()
        $('.form-signup').hide()
        $('#awal').show()
    }
    $('#signout').click(function () {
        signOut()
    })

    $('#mylist').click(function () {
        getTodo()
    })

    $('#createPro').click(function () {
        createProject()
    })

    $('#signMe').click(function () {
        signIn()
    })

    $('#todoCreate').click(function () {
        create()
    })


    $('#backIn').click(function () {
        backToSignIn()
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
                <p id="editMEE" style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" data-status ="${list.status}" class="edited" onclick="upstatus('${list._id}')">Edit ${realStatus}</p> 
                <p><i class="far fa-calendar-alt"></i> ${date}</p>
                <i id="delMe" style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" class="fas fa-trash fa-sm"></i>
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
                <p style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" data-status ="${list.status}" class="edited" id="editMEE" onclick="upstatus('${list._id}')">Edit ${realStatus}</p> 
                <p><i class="far fa-calendar-alt"></i> ${date}</p>
                <i id="delMe" style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" class="fas fa-trash fa-sm"></i>
                </div>`
                $('#todos-list').prepend(insert);
            }

        })
    })



    $('#homepage').click(function () {
        $('.form-signin').show()
        $('#awal').hide()
        $('.form-signup').hide()
    })

    $('#top-right').click(function () {
        profile()
    })

    $('#signup').click(function () {
        $('.form-signin').hide()
        $('#awal').hide()
        $('.form-signup').show()
    })

    $('#updata').click(function () {
        Swal.fire({
            title: 'Creating your account...',
            allowOutsideClick: () => !Swal.isLoading()
        })
        Swal.showLoading()
        $.ajax({
            url: 'http://35.198.251.14/user/register',
            method: 'POST',
            data: {
                name: $('#regName').val(),
                email: $('#regEmail').val(),
                password: $('#regPassword').val()
            }
        }).done(data => {
            Swal.close()
            Swal.fire("Success!","Your Account is Created!", "success");
            $('.form-signin').show()
            $('#awal').hide()
            $('.form-signup').hide()
        }).fail(function (jqXHR, textStatus) {
            Swal.fire("Error!",textStatus, "error");
        })
    })

    $("#find").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#todos-list .kotak").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});



$(document).on('click', '#backCreate', function () {
    backTocreate()
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
        pageAwal()
        getProjects()
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
                due_date: $('#myDate').val(),
                projectId: $('#userProjects').val()
            },
        })
        .done(function (newList) {
            Swal.close()
            Swal.fire("Success!", "Your Todo is Created!", "success");
            getTodo()
            let list = newList.data3
            let date = String(newList.data3.due_date).substr(0, 10)
            let status = newList.data3.status
            let realStatus;
            if (status == 'Undone') {
                realStatus = '<i class="fas fa-times"></i>'
            } else {
                realStatus = '<i class="fas fa-check"></i>'
            }
            let insert = `<div class ="kotak"  style="  border-top: 1px solid #0002;
            border-bottom: 1px solid  #0002;"> <h5 class="filter">${list.name}</h5> 
            <p>${list.description}</p>
            <p style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" data-status ="${list.status}" class="edited" onclick="upstatus('${list._id}')">Edit ${realStatus}</p> 
            <p><i class="far fa-calendar-alt"></i> ${date}</p>
            <i id="delMe" style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" class="fas fa-trash fa-sm"></i>
            </div>`
            $('#todos-list').prepend(insert);
        })
        .fail(function (jqXHR, textStatus) {
            Swal.fire("Error!", textStatus, "error");;
        });
}

function del(id) {
    let token = localStorage.getItem('token')
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
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
    })

}

function upstatus(id) {
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
            Swal.fire("Success!", "Your Account is Updated!", "success");
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
            <a href="#" id="backCreate">Create Todo</a>`
            $('#myId').prepend(insert)
        })
        .fail(function (jqXHR, textStatus) {
            console.log('Error:', textStatus);
        });
}

function backTocreate() {
    $('#containerku').show()
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
            <p style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" data-status ="${list.status}" class="edited" onclick="upstatus('${list._id}')">Edit ${realStatus}</p> 
            ${checkDate}
            <i style ="cursor: -webkit-grab; cursor: grab;" class="fas fa-trash fa-sm" onclick="del('${list._id}')"></i>
            </div>`
            $('#todos-list').prepend(insert);
        }

    }).fail(function (jqXHR, textStatus) {
        console.log('Error:', textStatus);
    });
}

function openMe(id) {
    getAllUsers()
    let template = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Add Member</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form action="">
    <div class="modal-body">
        <select multiple class="form-control" id="userss">
          </select>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary" onclick="addMember('${id}')">Add member</button>
    </div>
  </form>
  </div>
</div>
</div>`
    $('#modalHere').html(template)
}


function getProjects() {
    let token = localStorage.getItem('token')
    $.ajax({
        url: 'http://35.198.251.14/project/',
        method: 'GET',
        headers: {
            token
        }
    }).done(projects => {
        $('#projectss').empty()
        for (let i in projects) {
            let insert = `<option value="${projects[i]._id}">${projects[i].name}</option>`
            let insert2 = ` <div class="box11" data-id="${projects[i]._id}">
            <a href="#" class="pTodo" style="color:black;" onclick="getTodos('${projects[i]._id}')">${projects[i].name}</a>
            <button type="button" data-id="${projects[i]._id}" class="btn btn-primary proyek" data-toggle="modal"
             data-target="#exampleModal" onclick="openMe('${projects[i]._id}')">
             add Member
           </button> 
           <button onclick="deleteProject('${projects[i]._id}')" class="delMee">Delete</button>
         </div>
        `
            $('#userProjects').prepend(insert)
            $('#projectss').prepend(insert2)
        }
    }).fail(function (jqXHR, textStatus) {
        console.log('Error:', textStatus);
    });
}

function getAllUsers() {
    let token = localStorage.getItem('token')
    $.ajax({
        url: 'http://35.198.251.14/project/allUsers',
        method: 'GET',
        headers: {
            token
        }
    }).done(users => {
        for (let i in users) {
            let insert = `<option value="${users[i]._id}">${users[i].name}</option>`
            $('#userss').prepend(insert)
        }
    }).fail(function (jqXHR, textStatus) {
        console.log('Error:', textStatus);
    });
}

function createProject() {
    let token = localStorage.getItem('token')
    Swal.fire({
        title: 'Creating your project...',
        allowOutsideClick: () => !Swal.isLoading()
    })
    Swal.showLoading()
    $.ajax({
        url: 'http://35.198.251.14/project',
        method: 'POST',
        headers: {
            token
        },
        data: {
            name: $('#projName').val()
        }
    }).done(data => {
        Swal.close()
        Swal.fire("Success!", "Your Project is Created!", "success");
        $('#userProjects').empty()
        getProjects()
    }).fail(function (jqXHR, textStatus) {
        console.log('Error:', textStatus);
    });
}

function deleteProject(id) {
    let token = localStorage.getItem('token')
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'Deleting your project...',
                allowOutsideClick: () => !Swal.isLoading()
            })
            Swal.showLoading()
            $.ajax({
                url: `http://35.198.251.14/project/${id}`,
                method: 'DELETE',
                headers: {
                    token
                },
            }).done(data => {
                Swal.close()
                Swal.fire("Success!", "Your Project is Deleted!", "success");
                getProjects()
            }).fail(function (jqXHR, textStatus) {
                console.log('Error:', textStatus);
            });
        }
    })
}

function addMember(id) {
    let members = $('#userss').val()
    let token = localStorage.getItem('token')
    Swal.fire({
        title: 'Adding Members to Your Project...',
        allowOutsideClick: () => !Swal.isLoading()
    })
    Swal.showLoading()
    $.ajax({
        url: `http://35.198.251.14/project/members/${id}`,
        method: 'PATCH',
        headers: {
            token
        },
        data: {
            members
        },
    }).done(data => {
        Swal.close()
        Swal.fire("Success!", "You add members!", "success");
        getProjects()
    }).fail(function (jqXHR, textStatus) {
        console.log('Error:', textStatus);
    });
}

function pageAwal() {
    let token = localStorage.getItem('token')
    $.ajax({
        url: 'http://35.198.251.14/todo/getProfile',
        method: 'GET',
        headers: {
            token
        }
    }).done(profile => {
        $('#top-right').empty()
        $('#top-right').prepend(`<i class="fas fa-list"></i> ${profile.name}`)
        $('.form-signin').hide()
        $('.form-signup').hide()
        $('#awal').hide()
        $('#afterin').show()
        getTodo()
    }).fail(err => {
        console.log(err)
    })
}

function dateValidation() {
    let newdate;
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
}

function getTodos(id) {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `http://35.198.251.14/project/allTodos/${id}`,
        method: 'GET',
        headers: {
            token
        },
    }).done(({
        data
    }) => {
        $('#todos-list').empty()
        let todoss = data.todo
        for (let i = 0; i < todoss.length; i++) {
            let list = todoss[i]
            let targetDate = new Date(list.due_date)
            let date = String(list.due_date).substr(0, 10)
            let status = list.status
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
        border-bottom: 1px solid  #0002;"><h5 class="filter">${list.name}</h5> 
        <p>${list.description}</p>
        <p style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" data-status ="${list.status}" class="edited" id="editMEE" onclick="upstatusP('${list._id}')">Edit ${realStatus}</p> 
        ${checkDate}
        <i style ="cursor: -webkit-grab; cursor: grab;" data-id="${list._id}" class="fas fa-trash fa-sm" id="delMe" onclick="delP('${list._id}')"></i>
        </div>`
            $('#todos-list').prepend(insert);
        }
    }).fail(function (jqXHR, textStatus) {
        console.log('Error:', textStatus);
    });

}

function upstatusP(id) {
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
            url: 'http://35.198.251.14/todo/updateProjectStatus',
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
            Swal.fire("Success!", "Your Status is Updated!", "success");
            getTodos(response.data.projectId)
        })
        .fail(function (jqXHR, textStatus) {
            Swal.fire("Error!", textStatus, "error");
        });
}

function delP(id) {
    let token = localStorage.getItem('token')
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'Deleting your Todo...',
                allowOutsideClick: () => !Swal.isLoading()
            })
            Swal.showLoading()
            $.ajax({
                    url: 'http://35.198.251.14/todo/deleteProjectTodo',
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
                    getTodos(response.data.projectId)
                })
                .fail(function (jqXHR, textStatus) {
                    Swal.fire("Error!", textStatus, "error");
                });
        }
    })

}