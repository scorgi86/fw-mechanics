import { ErrorTemplateProps } from "../types"

export const NetworkError = (props: ErrorTemplateProps) => {
    return <div>Ошибка по умолчанию: {props.error.type}</div>
}

export default NetworkError;