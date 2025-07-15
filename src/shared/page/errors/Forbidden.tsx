import { ErrorTemplateProps } from "../types"

export const Forbidden = (props: ErrorTemplateProps) => {
    return <div>Ошибка по умолчанию: {props.error.type}</div>
}

export default Forbidden;