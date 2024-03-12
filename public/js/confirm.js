// $(window).on('beforeunload', function() {
//     $('#modals-custom-alert').toggleClass('d-none')
//     return 'Apakah anda yakin?'
// })

$('#modals-custom-alert .col-auto:first-child .btn-modals').on('click', function() {
    $('#modals-custom-alert').addClass('d-none')
})

$('#modals-custom-alert .col-auto:last-child .btn-modals').on('click', function() {
    $('#modals-custom-alert').addClass('d-none')
})