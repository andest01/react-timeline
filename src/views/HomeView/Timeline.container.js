/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTimeline } from '../../redux/modules/timeline.actions';
import {default as ReactCalendarTimeline} from 'react-calendar-timeline';
console.log(ReactCalendarTimeline);
// import DuckImage from './Duck.jpg';
// import classes from './HomeView.scss';

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class TimelineContainer extends React.Component<void, Props, void> {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    addTimeline: PropTypes.func.isRequired,
    shiftForward: PropTypes.func.isRequired
  };

  onAddEvent (e) {
    console.log(e);
    let now = new Date();
    let someTimeInMay = (new Date(now)).setMonth(5);
    let firstDayOfMay = (new Date(someTimeInMay)).setDate(1);
    let middleDayOfMay = (new Date(firstDayOfMay)).setDate(14);

    let newEvent = {
      name: 'sillyName',
      groupId: '1',
      start: new Date(firstDayOfMay),
      end: new Date(middleDayOfMay),
      id: Math.floor(Math.random() * 100000000)
    };

    debugger;
    this.props.addTimeline(newEvent);
  };

  onNextWeek (e) {
    this.props.shiftForward();

  }

  render () {
    let ourKeys = {
      groupIdKey: 'id',
      groupTitleKey: 'name',
      itemIdKey: 'id',
      itemTitleKey: 'name',
      itemGroupKey: 'groupId',
      itemTimeStartKey: 'start',
      itemTimeEndKey: 'end'
    };

    return (
      <div className='container text-center'>
        <ReactCalendarTimeline
          groups={this.props.timeline.eventGroups}
          items={this.props.timeline.events}
          keys={ourKeys}/>

        <button onClick={(e) => this.onAddEvent(e)}>Add Event</button>
        <button>Last Week</button>
        <button>Next Week</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timeline: state.timeline
});

export default connect((mapStateToProps), {
  addTimeline: (payload) => addTimeline(payload),
  shiftForward: () => shiftForward()
})(TimelineContainer);