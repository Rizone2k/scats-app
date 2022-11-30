export const calculateTime = (date) => {
    const [dateRelated, timeRelated] = date.split(' ');
    const curentDate = new Date();
    const [year, month, day] = dateRelated.split('-');
    const [hours, minutes, seconds] = timeRelated.split(':');
    const d = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
    const time = parseInt((curentDate.getTime() - d.getTime()) / 1000 / 60 / 60);

    if (time < 24) {
        return `${time} hour${time > 1 ? 's' : ''} ago`;
    }
    if (time >= 24 && time < 168) {
        return `${parseInt(time / 24)} day${parseInt(time / 24) > 1 ? 's' : ''} ago`;
    }
    if (time >= 168 && time < 720) {
        return `${parseInt(time / 24 / 7)} week${parseInt(time / 24 / 7) > 1 ? 's' : ''} ago`;
    }
    if (time >= 720 && time < 8760) {
        return `${parseInt(time / 24 / 7 / 30)} month${parseInt(time / 24 / 7 / 30) > 1 ? 's' : ''} ago`;
    }
    if (time >= 8760) {
        return `${parseInt(time / 24 / 365)} year${parseInt(time / 24 / 365) > 1 ? 's' : ''} ago`;
    }
}

function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
}

export const calculateTimeV2 = (date) => {
    const [dateRelated, timeRelated] = date.split(' ');
    const now = new Date();
    // const timeZone = 7;
    // var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
    //     now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    const curentDate = now.getTime() + (60 * 60 * 1000);
    const [year, month, day] = dateRelated.split('-');
    const [hours, minutes, seconds] = timeRelated.split(':');
    const d = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
    const time = parseInt((curentDate - d.getTime()) / 1000);
    if (time < 60) return `${time} giây trước`;
    if (time >= 60 && time < (60 * 60)) return `${parseInt(time / 60)} phút trước`;
    if (time >= (60 * 60) && time < (60 * 60 * 24)) return `${parseInt(time / (60 * 60))} giờ trước`;
    if (time >= (60 * 60 * 24) && time < (60 * 60 * 24 * 7)) return `${parseInt(time / (60 * 60 * 24))} ngày trước`;
    if (time >= (60 * 60 * 24 * 7) && time < (60 * 60 * 24 * 30)) return `${parseInt(time / (60 * 60 * 24 * 7))} tuần trước`;
    if (time >= (60 * 60 * 24 * 30) && time < (60 * 60 * 24 * 365)) return `${parseInt(time / (60 * 60 * 24 * 30))} tháng trước`;
    if (time >= (60 * 60 * 24 * 365)) return `${parseInt(time / (60 * 60 * 24 * 365))} năm trước`;
}