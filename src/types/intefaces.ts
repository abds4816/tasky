import { ReactNode } from "react"

export interface INavLink{
    title : string,
    href  :string
}

export interface IStatistic{
    title:string,
    icon:ReactNode,
    value:number|string,
    percentageChange:number|string,
    description:string
}