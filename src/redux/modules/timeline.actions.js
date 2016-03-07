'use strict';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import moment from 'moment';
// ------------------------------------
// Constants
// ------------------------------------
export const TIMELINE_ADD_EVENT = 'TIMELINE_ADD_EVENT';
export const TIMELINE_ADD_GROUP = 'TIMELINE_ADD_GROUP';
export const TIMELINE_SHIFT_NEXT_WEEK = 'TIMELINE_SHIFT_NEXT_WEEK';
export const TIMELINE_SHIFT_PREVIOUS_WEEK = 'TIMELINE_SHIFT_PREVIOUS_WEEK';

let makeFakeGroup = (index) => {
  let today = new Date();
  let tomorrow = addDays(today, 1);

  let dayAfterTomorrow = addDays(tomorrow, 1);
  let dayAfterDayAfterTomorrow = addDays(dayAfterTomorrow, 1);

  let firstEvent = {
    start: today,
    end: tomorrow,
    name: 'first event',
    groupId: index + ''
  };

  let secondEvent = {
    start: dayAfterTomorrow,
    end: dayAfterDayAfterTomorrow,
    name: 'second event',
    groupId: index + ''
  };

  return {events: [firstEvent, secondEvent], name: 'name_' + index, id: index + ''};
};

// ------------------------------------
// Default State
// ------------------------------------
let eventGroups = [makeFakeGroup(1), makeFakeGroup(2), makeFakeGroup(3), makeFakeGroup(4), makeFakeGroup(5)];
let events = _.flatten(_.map(eventGroups, 'events'), true);
events.forEach((e, index) => { e.id = index; });
let firstDay = moment().startOf('day').toDate(); // new Date();?
let lastDay = moment().endOf('day').add(6, 'days').toDate();

const DEFAULT_SETTINGS_STATE = {
  eventGroups: eventGroups,
  events: events,
  bookendsBeginning: firstDay,
  bookendsFinish: lastDay
};

function addDays (date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// ------------------------------------
// Actions
// ------------------------------------
export const addTimeline = createAction(TIMELINE_ADD_EVENT);
export const addGroup = createAction(TIMELINE_ADD_GROUP);
export const shiftForward = createAction(TIMELINE_SHIFT_NEXT_WEEK);
export const shiftBackward = createAction(TIMELINE_SHIFT_PREVIOUS_WEEK);
export const mapSettingsActions = {
  addTimeline,
  addGroup,
  shiftForward,
  shiftBackward
};

var actionHandlers = {
  [TIMELINE_ADD_EVENT]: (state, { payload }) => {
    let newState = {};
    let { start, end, name, groupId, id } = payload;
    let newItem = {start, end, name, groupId, id};
    let newItems = state.events.concat(newItem);
    newState.events = newItems;
    let finalState = Object.assign({}, state, newState);
    return finalState;
  },
  [TIMELINE_ADD_GROUP]: (state, { payload }) => {
    let newState = {};
    let finalState = Object.assign({}, state, newState);
    return finalState;
  },
  [TIMELINE_SHIFT_NEXT_WEEK]: (state, { payload }) => {
    let newState = {};
    let begindate = moment(state.bookendsFinish).add(1, 'day').startOf('day');
    let enddate = moment(state.bookendsFinish).add(7, 'day').endOf('day');
    newState.bookendsBeginning = begindate.toDate();
    newState.bookendsFinish = enddate.toDate();
    let finalState = Object.assign({}, state, newState);
    return finalState;
  },
  [TIMELINE_SHIFT_PREVIOUS_WEEK]: (state, {payload}) => {
    let newState = {};
    let begindate = moment(state.bookendsBeginning).add(-7, 'day').startOf('day');
    let enddate = moment(state.bookendsBeginning).add(-1, 'day').endOf('day');
    newState.bookendsBeginning = begindate.toDate();
    newState.bookendsFinish = enddate.toDate();
    let finalState = Object.assign({}, state, newState);
    return finalState;
  }
};

export default handleActions(actionHandlers, DEFAULT_SETTINGS_STATE);
