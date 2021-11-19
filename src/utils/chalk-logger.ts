import chalk from 'chalk'


/**
 * Yellow log
 *
 * @param  {any} msg message which could print out
 */
 export function yellowLog(msg: any) {
    console.log(chalk.yellow(msg))
}

/**
 * Green log
 *
 * @param  {any} msg message which could print out
 */
 export function greenLog(msg: any) {
    console.log(chalk.green(msg))
}

/**
 * Red log
 *
 * @param  {any} msg message which could print out
 */
 export function redLog(msg: any) {
    console.log(chalk.red(msg))
}
