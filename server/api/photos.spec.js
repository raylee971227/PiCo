const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Photo = db.model('Photos')

describe('Photo Routes', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })
    describe('Single Photo Upload', () => {
        const photo1 = "example1_photo_path.jpg"

        beforeEach(() => {
            return Photo.create({
                photoPath: photo1
            })
        })

        it('GET /api/photos', async () => {
            const res = await request(app).get('/api/photo/').expect(200)
                
            expect(res.body).to.be.an('array')
            expect(res.body[0].photoPath).to.be.equal(photo1)
        })
    })

    describe('Multiple Photo Upload', () => {
        const photo2 = "example2_photo_path.jpg"
        const photo3 = "example3_photo_path.jpg"
        const photo4 = "exampe4_photo_path.jpg"

        beforeEach(() => {
            return Photo.bulkCreate([
                {photoPath: photo2},
                {photoPath: photo3},
                {photoPath: photo4}
            ])
        })

        it('Upload multiple photos', async () => {
            const res = await request(app).get('/api/photo').expect(200)
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.length(3)
        })

        it('GET all correct photos', async () => {
            const res = await request(app).get('/api/photo').expect(200)
            expect(res.body[0].photoPath).to.equal(photo2)
            expect(res.body[1].photoPath).to.equal(photo3)
            expect(res.body[2].photoPath).to.equal(photo4)
        })
    })
})