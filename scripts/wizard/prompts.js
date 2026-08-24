import readline from 'readline'
import pc from 'picocolors'

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

export const ask = (query, defaultValue = '') => {
    return new Promise((resolve) => {
        const hint = defaultValue ? pc.dim(` (Predeterminado: "${defaultValue}")`) : ''
        const promptText = `${pc.cyan('?')} ${pc.bold(query)}${hint}: `
        rl.question(promptText, (answer) => {
            resolve(answer.trim() || defaultValue)
        })
    })
}

export const askConfirm = async (query, defaultYes = true) => {
    const hint = defaultYes ? pc.yellow('(S/n)') : pc.yellow('(s/N)')
    const answer = await ask(`${query} ${hint}`, defaultYes ? 's' : 'n')
    return answer.toLowerCase().startsWith('s')
}

export const askSelect = async (query, options) => {
    console.log(`\n${pc.bold(pc.yellow(query))}`)
    options.forEach((opt, index) => {
        const badge = pc.cyan(`[${index + 1}]`)
        console.log(`   ${badge} ${opt.label}`)
    })
    const choiceStr = await ask('   Selecciona una opción (número)', '1')
    const choiceNum = parseInt(choiceStr, 10)
    if (isNaN(choiceNum) || choiceNum < 1 || choiceNum > options.length) {
        return options[0].value
    }
    return options[choiceNum - 1].value
}

export const printHeader = (title) => {
    console.log(`\n${pc.cyan('===================================================================')}`)
    console.log(`  ${pc.bold(pc.green(title))}`)
    console.log(`${pc.cyan('===================================================================\n')}`)
}

export const printSectionTitle = (title) => {
    console.log(`\n${pc.bold(pc.magenta(`> ${title}`))}`)
}

export const closePrompts = () => {
    rl.close()
}
