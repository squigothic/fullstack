const blogs = [
  {
    'title': 'Maken eka oma blogi',
    'author': 'make vaan',
    'url': 'makenblogi.net',
    'likes': 11,
    'user': {
      'username': 'make',
      'name': 'testi kayttaja',
      'id': '5c5ebc05a258c4654e5676b9'
    },
    'id': '5c5ecd39be73670224ef69ed'
  },
  {
    'title': 'maken uusi kotskasivu',
    'author': 'make tietty',
    'url': '123.com', 'likes': 11,
    'user': {
      'username': 'make',
      'name': 'testi kayttaja',
      'id': '5c5ebc05a258c4654e5676b9'
    },
    'id': '5c81828965421e57da36ed8b'
  },
  {
    'title': 'Make kertoo asioita',
    'author': 'MAKE',
    'url': 'makenkotskasivu.com',
    'likes': 10,
    'user': {
      'username': 'make',
      'name': 'testi kayttaja',
      'id': '5c5ebc05a258c4654e5676b9'
    },
    'id': '5c851a8565421e57da36ed8c'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }

