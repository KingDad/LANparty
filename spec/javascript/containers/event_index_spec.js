import Events from '../../../app/javascript/react/containers/Events.js'
import { mount } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'
import React from 'react'
import fetchMock from 'fetch-mock'

describe('events component', () => {
  let wrapper
  let events

  beforeEach(() => {
    jasmineEnzyme()
    events = {events: [
      {id: 4, formatted_title: "Fight party"},
      {id: 17, formatted_title: "Pokeparty"}
      ]
    }

    fetchMock.get(`/api/v1/events`, {
      status: 200,
      body: events
    })
    wrapper = mount(
      <Events
      />
    )
  })

  afterEach(fetchMock.restore)

  describe('A list of events', () => {
    it('render names of the events', (done) => {
      setTimeout(() =>{
        expect(wrapper.text()).toMatch(events.events[0].formatted_title)
        expect(wrapper.text()).toMatch(events.events[1].formatted_title)

        done()
      }, 0)
    })

  })
})
