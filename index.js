require('colors')
const request = require('request')
const cheerio = require('cheerio')

const url = 'https://jadwalsholat.org/adzan/monthly.php?id=307'

request(url, function (err, res, body) {
    if (err && res.statusCode !== 200) {
        throw err
    }

    let element = cheerio.load(body)
    element('table.table_adzan tr[align=center]').each((i, data) => {
        element(data).find('td').each((i, row) => {
            if (element(data).attr('class') === 'table_highlight') {
                return process.stdout.write(element(row).text().red + '\t')
            }
            return process.stdout.write(element(row).text() + '\t')
        })
        process.stdout.write('\n')
    })
})