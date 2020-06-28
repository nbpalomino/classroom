import swal from 'sweetalert'

export default function alert(message, type) {
    swal(message, '', (type || 'success'));
}
