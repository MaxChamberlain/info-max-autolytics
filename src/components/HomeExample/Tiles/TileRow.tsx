import { useContext } from "react"

export default function TileRow({ children, style, disableVariableWidth }: { children: React.ReactNode, style?: React.CSSProperties, disableVariableWidth?: boolean }){
    return(
        <div className={
            (disableVariableWidth)
            ? "flex lg:flex-row flex-col justify-between w-full gap-4 py-4 static"
            : "flex lg:flex-row flex-col justify-between w-5/6 gap-4 p-4 pr-8 static"
        } style={style}>
            {children}
        </div>
    )
}