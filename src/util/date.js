import { format, parseISO } from 'date-fns';

export function formatDate(date, _format) {
    if (date == null) return "-";
    _format = _format || FORMATS.FULL;
    return format(parseISO(date), _format);
}

export const FORMATS = {
    FULL: 'dd/MM/yyyy HH:mm:ss',
    SEMIFULL: 'dd/MM/yyyy HH:mm',
    DATE_ONLY: 'dd/MM/yyyy',
    DATE: 'yyyy-MM-dd',
    HOURS_ONLY: 'HH:mm:ss',
}