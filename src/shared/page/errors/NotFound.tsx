import { ErrorTemplateProps } from "../types"

export const NotFound = (props: ErrorTemplateProps) => {
    return <div>Ошибка по умолчанию: {props.error.type}</div>
}

export default NotFound;