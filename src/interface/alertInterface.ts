export interface Alert {
    title: String
    type: 'info' | 'success' | 'warning' | 'error'
    effect?: 'light' | 'dark'
    showIcon?: Boolean
}
