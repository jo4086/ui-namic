import { Application } from 'express'

declare global {
    type ExpressServer = Application
}

export {}
