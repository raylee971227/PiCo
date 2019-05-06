const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Album = db.model('Albums')

describe('Album routes', () => {
    describe('/api/albums/', () => {
        const testAlbum1 = 'testAlbum1'

        beforeEach(() => {
            return Album.create({
                albumName: testAlbum1
            })
        })

        it('GET single album', async () => {
            const res = await request(app).get('/api/albums').expect(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0].albumName).to.be.equal(testAlbum1)
        })
    })

    describe('Individual album routes', () => {
        const testAlbum1 = 'testAlbum1'
        const testAlbum2 = 'testAlbum2'

        beforeEach(() => {
            Album.destroy({where:{albumName:'testAlbum1'}})
            return Album.bulkCreate([
                {albumName: testAlbum1},
                {albumName: testAlbum2}
            ])
        })

        it('Upload multiple albums', async () => {
            const res = await request(app).get('/api/albums').expect(200)
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf(2)
        })

        it('GET correct albums', async () => {
            const res = await request(app).get('/api/albums').expect(200)
            expect(res.body[0].albumName).to.be.equal(testAlbum1)
            expect(res.body[1].albumName).to.be.equal(testAlbum2)
        })
    })
})
