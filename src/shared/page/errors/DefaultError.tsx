import { ErrorTemplateProps } from "../types"

export const DefaultError = (props: ErrorTemplateProps) => {
    return <div>Ошибка по умолчанию: {props.error.type}</div>
}

export default DefaultError;