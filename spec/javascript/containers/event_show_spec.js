import Event from '../../../app/javascript/react/containers/Event.js'
import TwitchContainer from '../../../app/javascript/react/components/TwitchContainer.js'
import GameTile from '../../../app/javascript/react/components/GameTile.js'
import { mount } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'
import React from 'react'
import fetchMock from 'fetch-mock'

describe('event component', () => {
  let wrapper
  let fightParty

  beforeEach(() => {
    jasmineEnzyme()
    fightParty = {event: {
        attendees: 1,
        creator_id: 4,
        current_user_attendance_type: "attending",
        description: "All fighting games all night",
        event_datetime: "2019-05-20T20:00:00.000Z",
        formatted_title: "Fight Party",
        id: 2,
        playables: [
          {id: 1, game_id: 8258},
          {id: 64, game_id: 7498},
          {id: 66, game_id: 13620}
        ],
        twitch_stream: "capcomfighters",
        user_id: 4,
        viewers: 0
      }
    }

    fetchMock.get(`/api/v1/events/${fightParty.event.id}`, {
      status: 200,
      body: fightParty
    })
    wrapper = mount(
      <Event
        params={ { id: fightParty.event.id } }
      />
    )
  })

  afterEach(fetchMock.restore)

  describe('Details for a specific event', () => {
    it('Render event title', (done) => {
      setTimeout(() =>{
        expect(wrapper.text()).toMatch(fightParty.event.formatted_title)

        done()
      }, 0)
    })

    it('Render event description', (done) => {
      setTimeout(() =>{
        expect(wrapper.text()).toMatch(fightParty.event.description)

        done()
      }, 0)
    })

    it('Render event time', (done) => {
      setTimeout(() =>{
        expect(wrapper.text()).toMatch("Mon May 20, 2019 at 4:00:00 PM")

        done()
      }, 0)
    })

    it('Should render edit and delete buttons if the current_user matches creator_id', (done) => {
      setTimeout(() =>{
        expect(wrapper.text()).toMatch("Edit")
        expect(wrapper.text()).toMatch("Delete")

        done()
      }, 0)
    })

  })
})
