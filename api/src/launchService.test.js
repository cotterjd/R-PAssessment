const launchService = require('./launchService')

describe('lauchSevice', () => {
  test('should return error if filters is sting', async () => {
    try {
      await launchService('')
    } catch(e) {
      expect(e.message).toMatch('filters must be an array')
    }
  })
  test('should return error if filters an object', async () => {
    try {
      await launchService({})
    } catch(e) {
      expect(e.message).toMatch('filters must be an array')
    }
  })
  test('should return error if filters elements are not a sting', async () => {
    try {
      await launchService([{}])
    } catch(e) {
      expect(e.message).toMatch('filters must be an array of strings')
    }
  })
  test('should return error if filters contains invalid element', async () => {
    try {
      await launchService(['with_reddit', 'foobar', 'land_success'])
    } catch(e) {
      expect(e.message).toMatch('foobar is not a valid filler')
    }
  })
  test('should work with filters as empty array', async () => {
    const r = await launchService([])
    testAllTheThings(r)
  })
  test('should only return records with reused elements when the reused filter is included', async () => {
    const r = await launchService(['reused'], 'localhost')
    testAllTheThings(r)
    const xs = r.data.launches
    testReuse(xs)
  })
  test('should only return records with successful launches when the land_success filter is included', async () => {
    const r = await launchService(['land_success'])
    testAllTheThings(r)
    const xs = r.data.launches
    testSuccess(xs)
  })
  test('should only return records with reddit links when the "with reddit" filter is included', async () => {
    const r = await launchService(['with_reddit'])
    testAllTheThings(r)
    const xs = r.data.launches
    testReddit(xs)
  })
  test('should only return records with reddit links and reused elements when the "with reddit" and reused filters are included', async () => {
    const r = await launchService(['with_reddit', 'reused'])
    testAllTheThings(r)
    const xs = r.data.launches
    testReddit(xs)
    testReuse(xs)
  })
  test('should only return records with reused elements and successful launches when the reused and land_success filters are included', async () => {
    const r = await launchService(['reused', 'land_success'], 'localhost')
    testAllTheThings(r)
    const xs = r.data.launches
    testReuse(xs)
    testSuccess(xs)
  })
  test('should only return records with successful launches and reddit stuff when the land_success and "with reddit" filters are included', async () => {
    const r = await launchService(['land_success', 'with_reddit'])
    testAllTheThings(r)
    const xs = r.data.launches
    testReddit(xs)
    testSuccess(xs)
  })
  test('should only return records with reddit links, reused elements, and successful launches when the "with reddit", reused, and land_success filters are included', async () => {
    const r = await launchService(['with_reddit', 'reused', 'land_success'])
    testAllTheThings(r)
    const xs = r.data.launches
    testReddit(xs)
    testReuse(xs)
    testSuccess(xs)
  })
})

function testSuccess(xs) {
  expect(xs.every(x => x.launch_success === true)).toBe(true)
}

function testReuse(xs) {
  expect(xs.every(x => {
    return Object.values(x.reuse).some(val => !!val)
  })).toBe(true)
}

function testReddit(xs) {
  expect(xs.every(x => {
    return Object.keys(x.links).some(key => key.slice(0, 7) === 'reddit_' && !!x.links[key])
  })).toBe(true)
}

function testAllTheThings(r) {
    expect(r).not.toEqual(null)
    expect(r).not.toEqual(undefined)
    expect(r.data).not.toEqual(null)
    expect(r.data).not.toEqual(undefined)
    expect(r.data.launches).not.toEqual(null)
    expect(r.data.launches).not.toEqual(undefined)
    expect(typeof r.data.launches).toEqual("object")
    expect(r.data.launches instanceof Array).toEqual(true)
    const x = r.data.launches[0]
    expect(x).not.toBe(null)
    expect(x).not.toBe(undefined)
    expect(x.mission_patch_small).not.toBe(null)
    expect(x.mission_patch_small).not.toBe(undefined)
    expect(x.id).not.toBe(null)
    expect(x.id).not.toBe(undefined)
    expect(x.rocket_name).not.toBe(null)
    expect(x.rocket_name).not.toBe(undefined)
    expect(x.rocket_type).not.toBe(null)
    expect(x.rocket_type).not.toBe(undefined)
    expect(x.launch_date).not.toBe(null)
    expect(x.launch_date).not.toBe(undefined)
    expect(x.flight_number).not.toBe(null)
    expect(x.flight_number).not.toBe(undefined)
    expect(x.launch_success).not.toBe(null)
    expect(x.launch_success).not.toBe(undefined)
    expect(x.details).not.toBe(null)
    expect(x.details).not.toBe(undefined)
    expect(x.article_link).not.toBe(null)
    expect(x.article_link).not.toBe(undefined)
    expect(x.reuse).not.toBe(null)
    expect(x.reuse).not.toBe(undefined)
    expect(x.reuse.core).not.toBe(null)
    expect(x.reuse.core).not.toBe(undefined)
    expect(x.reuse.side_core1).not.toBe(null)
    expect(x.reuse.side_core1).not.toBe(undefined)
    expect(x.reuse.side_core2).not.toBe(null)
    expect(x.reuse.side_core2).not.toBe(undefined)
    expect(x.reuse.fairings).not.toBe(null)
    expect(x.reuse.fairings).not.toBe(undefined)
    expect(x.reuse.capsule).not.toBe(null)
    expect(x.reuse.capsule).not.toBe(undefined)
    expect(x.links).not.toBe(null)
    expect(x.links).not.toBe(undefined)
}
