/**
 * 获取日期
 * @param date
 * @constructor
 */
export const FormatSearchDate = (date: Date | null) => {
    if (date == null) {
        return ""
    }
    // todo 增加星期返回
    return (date.getMonth() + 1) + "月" + date.getDate() + "日星期五"
}
export const FormatDateCn = (date: Date | null) => {
    if (date == null) {
        return ""
    }
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
}

export const FormatDate = (date: Date | null) => {
    if (date == null) {
        return ""
    }
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}
