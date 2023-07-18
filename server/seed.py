from faker import Faker
from models import *
from config import db, app
from random import sample

fake = Faker()

def seed():
    userLen = len(User.query.all())
    recordLen = len(Record.query.all())

    User.query.delete()
    Record.query.delete()
    Comment.query.delete()
    Favorite.query.delete()

    users = [
        User(
            username='jrocc',
            password_hash='yessir',
            name='Eli',
            location='Pittsburgh',
            bio='''Record lord and king admin''',
            image='https://cdn4.whatculture.com/images/2019/07/bdef9180de6bb5e7-600x338.jpeg'
        ),
        User(
            username='prokie',
            password_hash='lilmama',
            name='Maggie',
            location='Pittsburgh',
            bio='''Record queen and dentist''',
            image='https://www.absolutedental.com/wp-content/uploads/2012/10/patient-at-the-dentists-office.jpg'
        ),
        User(
            username='cryptoking',
            password_hash='kb',
            name='Kwame',
            location='New Jersey',
            bio='''Avid anime enjoyer''',
            image='https://avatars.githubusercontent.com/u/94415456?v=4'
        ),
        User(
            username='seannymac',
            password_hash='drummer',
            name='Sean',
            location='Raleigh',
            bio='''Drummer and overall good dude''',
            image='https://yt3.googleusercontent.com/YaJHh5SnF1sCzOnWvyXv2oF9aNZCHBBa6yBiqq_2OBF6zF2xM0_n60Y2nBe5tRQU_2qmXpr2=s900-c-k-c0x00ffffff-no-rj'
        ),
        User(
            username='DeeDee',
            password_hash='bone',
            name='Diamond',
            location='Elwood City',
            bio='''I'm literally always panting''',
            image='https://img.freepik.com/free-photo/puppy-that-is-walking-snow_1340-37228.jpg'
        )
    ]

    db.session.add_all(users)

    records = [
        Record(
            title='Ambient 1 : Music For Airports',
            artist='Brian Eno',
            description='''Eno's landmark Ambient album from 1978 has been Half Speed Mastered by Miles Showell at Abbey Road Studios, London and is now presented in a gatefold sleeve on 2 180 gram discs which have been cut at 45rpm for a superior listening experience. Complete with an Obi and Abbey Road Certificate of Authenticity and contains a Download Voucher.''',
            image='https://i.discogs.com/Ajqk0nO1MjaxCMUzY-D9EzrTBRRbaKJE8WFKSvkaVEU/rs:fit/g:sm/q:90/h:588/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNTc3/Ni0xNjE2NDg1MDk2/LTE5NDIuanBlZw.jpeg',
            user_id=1
        ),
        Record(
            title='The Money Store',
            artist='Death Grips',
            description='''Released in a small quantity of 500 to stores participating in Record Store Day on April 21, 2012. Released to all retail outlets on May 22, 2012.''',
            image='https://i.discogs.com/90Hnk7URkBYFS2v2v1aTvxY5vSjjlRC25AappjcaEsQ/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM1NTU3/ODQtMTMzODIzMTc2/Mi03NDQ4LmpwZWc.jpeg',
            user_id=2
        ),
        Record(
            title='Madvillainy',
            artist='Madvillain',
            description='''Side A rim text: Written in cold with a tooth pick / Side C rim text: Songs lit in the booth with the best host / doing bong hits on the roof within the west coast''',
            image='https://i.discogs.com/PsFsVHAf4UF5fnZg4sZ9Az8fCTZocPl9fzdMHdr-i40/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3MjUx/MTI5LTE2NjUyNjk1/ODktNTkzMi5qcGVn.jpeg',
            user_id=3
        ),
        Record(
            title='Blond',
            artist='Frank Ocean',
            description='''2xLP full-colour, gatefold packaging 12\" x 36\" Lyrics foldout 12\" x 24\" Foldout poster''',
            image='https://i.discogs.com/zMe1fzwVZTbfBimS0hONvRN8D0T5GgNXJ4lfxbIm8rI/rs:fit/g:sm/q:90/h:566/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI1NTAw/ODc3LTE2NzQ3Nzgy/MzgtMjgxMi5qcGVn.jpeg',
            user_id=4
        ),
        Record(
            title='Selected Ambient Works 85-92',
            artist='Aphex Twin',
            description='''"Xtal" samples "Evil At Play" from Atmospheric - Vocal. "We are the music makers..." sample taken from the movie "Willy Wonka & the Chocolate Factory".''',
            image='https://i.discogs.com/CNUO9Rh7SFL3v9tkDGUSyQcuhHRbX0kdL_GMXIE1yVU/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE1NDUz/MTMtMTY2NTQ3OTEw/MS02OTk2LmpwZWc.jpeg',
            user_id=5
        ),
        Record(
            title='Stranger',
            artist='Yung Lean',
            description='''Lightly used but still good :)''',
            image='https://i.discogs.com/UEM3LxrKL1X69INPNor5M3oFm0bZC651my4ypcWdySg/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMTIz/ODYyLTE1MTAyOTMw/OTgtMTUyNy5qcGVn.jpeg',
            user_id=1
        ),
        Record(
            title='Aja',
            artist='Steely Dan',
            description='''Aja (pronounced Asia) is the sixth studio album by Steely Dan. Released in 1977, the album peaked at number three on the US charts and number five in the UK. It was the band's first platinum album and ultimately became their best-selling studio release, eventually selling over 5 million copies. The album includes the hit songs "Deacon Blues", "Peg" and "Josie". In 2010 the Library of Congress selected Aja for inclusion in the United States National Recording Registry based on its cultural, artistic or historical significance.''',
            image='https://i.discogs.com/3Pxzvua2yABfdbcOVeiTdXiLvIYxULvquQzSG6Cj-ak/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4NDIz/MzQtMTMxOTU5NTc4/NC5qcGVn.jpeg',
            user_id=2
        ),
        Record(
            title='6 Feet Beneath The Moon',
            artist='King Krule',
            description='''Best Song: Out Getting Ribs''',
            image='https://i.discogs.com/iYn6y7XChTnQ8YTQ56nhSSryL-0iVGoZUCy_tniosNs/rs:fit/g:sm/q:90/h:491/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ4NDYz/ODQtMTM3NzM0NTI4/OS05MjM1LmpwZWc.jpeg',
            user_id=3
        ),
        Record(
            title='Этажи',
            artist='Молчат Дома',
            description='''really good''',
            image='https://i.discogs.com/rUX0QD41Os5SzqZnAsyqUALQGqWcqAOFGpFBHDv4BgI/rs:fit/g:sm/q:90/h:593/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNDUw/MzAzLTE1Mzg1MDAw/MjgtODgyMy5qcGVn.jpeg',
            user_id=4
        ),
        Record(
            title='All Things Must Pass',
            artist='George Harrison',
            description='''The album was critically acclaimed and, with long stays at number 1 in both the US and the UK, commercially successful. It was certified 6x platinum by the Recording Industry Association of America in 2001.''',
            image='https://i.discogs.com/yYqf5d1LEAbi7IYay5a61LwqgNSYLPLYvJ1SxcU7P3c/rs:fit/g:sm/q:90/h:599/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTUxNjg4/Mi0xNjMxNTc1MTE1/LTQ4MDEuanBlZw.jpeg',
            user_id=5
        ),
        Record(
            title='Depression Cherry',
            artist='Beach House',
            description='''it's pretty sad''',
            image='https://i.discogs.com/fM_XH-5ZRQTBR-_koiuGDfOOS80s6OyzpMdzCikhwrI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTczOTE2/ODMtMTQ0NDI0NTA5/OS0yNDg1LmpwZWc.jpeg',
            user_id=1
        ),
        Record(
            title='Souvlaki',
            artist='Slowdive',
            description='''this one is a little sad''',
            image='https://i.discogs.com/i7xH4rv3WwaRaG_ky3mlJCkCQZ18YnczTcNQs9aYpQ0/rs:fit/g:sm/q:90/h:600/w:589/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgyOTIw/MC0xNTk1MzY1NzA2/LTUwNzUuanBlZw.jpeg',
            user_id=2
        ),
        Record(
            title='Bloom',
            artist='Beach House',
            description='''classic beach house album''',
            image='https://i.discogs.com/BEXZktncllZnO3Ge6L7RLmzJtHdYY54FBU70kLeQKGI/rs:fit/g:sm/q:90/h:423/w:450/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM1OTgw/MzktMTMzNjgyMjUx/Ny0xMDczLmpwZWc.jpeg',
            user_id=3
        ),
        Record(
            title='When I Get Home',
            artist='Solange',
            description='''keyboards are on point on this one''',
            image='https://i.discogs.com/1oVq5uPQGWyn103gGPHZq7kcpWMsBqxFrHy8HZvRJ4Y/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMjg4/MjcwLTE1NTE0NDg1/NTQtNTkyMC5qcGVn.jpeg',
            user_id=4
        ),
        Record(
            title='Channel Orange',
            artist='Frank Ocean',
            description='''little did we know''',
            image='https://i.discogs.com/2iKKnc0QOYw2-boATOpXWZnrTXMLmlHJydIBC4ovrQI/rs:fit/g:sm/q:90/h:544/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM3MzQ0/MjUtMTY2MjUwNTIw/MS0zMTIxLmpwZWc.jpeg',
            user_id=5
        ),
        Record(
            title='Jesus is Born',
            artist='Sunday Service Choir',
            description='''Jesus Is Born is the debut studio album by American gospel group Sunday Service Choir, led by American rapper Kanye West. It was released on December 25, 2019, through INC. The album was released to coincide with Christmas and follows the release of West's Christian-themed ninth studio album Jesus Is King, which was released two months prior in October 2019.[1] Though the album is credited to the Sunday Service Choir, multiple publications consider Jesus Is Born to be part of West's album discography.''',
            image='https://i.discogs.com/ceBeb-ySWVDBmgY7oYMqaPJ5BSTwUh-5-ql5fq5JRTY/rs:fit/g:sm/q:90/h:320/w:320/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwMjg2/MTEyLTE2MzIwMjUy/MzgtMzkxMC5qcGVn.jpeg',
            user_id=1
        ),
        Record(
            title='Head Hunters',
            artist='Herbie Hancock',
            description='''Groundbreaking jazz-funk album - one of the best-selling jazz recordings and the first to go platinum.''',
            image='https://i.discogs.com/PzhEnDeEy-u3foEvF-q1mPZDeTGt__d6k4j9XUZ7q_c/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMxMzgx/LTE0MzMyNTkxNDMt/ODUyMi5qcGVn.jpeg',
            user_id=2
        ),
        Record(
            title='Halcyon Digest',
            artist='Deerhunter',
            description='''bizarre but great''',
            image='https://i.discogs.com/UAoS_yjhAQO31u2XHuMLmv_YlYENRhcYxszT0O3xs6U/rs:fit/g:sm/q:90/h:539/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0Njky/MTMtMTQ1NDE1Mzc4/My01OTUyLnBuZw.jpeg',
            user_id=3
        ),
        Record(
            title='If Orange Was A Place',
            artist='Tems',
            description='''incredible voice''',
            image='https://i.discogs.com/pXA8__RCKPTcbBYN7p1gLNfB8gT7FBzEeBn03W62yHA/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2NTQw/NDI2LTE2Nzk3NjA3/OTAtMzE2MC5qcGVn.jpeg',
            user_id=4
        ),
        Record(
            title='Currents',
            artist='Tame Impala',
            description='''album means so much to me''',
            image='https://i.discogs.com/EB6i3MltuGKX7DuCF4TDeqxK-ReTBPAf2cInVw5kX0c/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTcyNjg5/NDMtMTQzNzYzNTcy/Ni00NzU5LmpwZWc.jpeg',
            user_id=5
        )
    ]

    db.session.add_all(records)

    comments = [
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=1,
            record_id=1
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=1,
            record_id=2
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=1,
            record_id=3
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=2,
            record_id=4
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=2,
            record_id=5
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=2,
            record_id=6
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=3,
            record_id=7
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=3,
            record_id=8
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=3,
            record_id=9
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=4,
            record_id=10
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=4,
            record_id=11
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=4,
            record_id=12
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=5,
            record_id=13
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=5,
            record_id=14
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=5,
            record_id=15
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=1,
            record_id=16
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=2,
            record_id=17
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=3,
            record_id=18
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=4,
            record_id=19
        ),
        Comment(
            body = fake.text(max_nb_chars=50),
            user_id=5,
            record_id=20
        )
    ]

    db.session.add_all(comments)

    favorites = [
        Favorite(
            user_id=1,
            record_id=1
        ),
        Favorite(
            user_id=1,
            record_id=2
        ),
        Favorite(
            user_id=1,
            record_id=3
        ),
        Favorite(
            user_id=2,
            record_id=4
        ),
        Favorite(
            user_id=2,
            record_id=5
        ),
        Favorite(
            user_id=2,
            record_id=6
        ),
        Favorite(
            user_id=3,
            record_id=7
        ),
        Favorite(
            user_id=3,
            record_id=8
        ),
        Favorite(
            user_id=3,
            record_id=9
        ),
        Favorite(
            user_id=4,
            record_id=10
        ),
        Favorite(
            user_id=4,
            record_id=11
        ),
        Favorite(
            user_id=4,
            record_id=12
        ),
        Favorite(
            user_id=5,
            record_id=13
        ),
        Favorite(
            user_id=5,
            record_id=14
        ),
        Favorite(
            user_id=5,
            record_id=15
        ),
        Favorite(
            user_id=1,
            record_id=16
        ),
        Favorite(
            user_id=2,
            record_id=17
        ),
        Favorite(
            user_id=3,
            record_id=18
        ),
        Favorite(
            user_id=4,
            record_id=19
        ),
        Favorite(
            user_id=5,
            record_id=20
        )
    ]

    db.session.add_all(favorites)

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed()
        print('seeding successful')
