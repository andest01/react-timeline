/* @flow */
/*eslint react/jsx-no-bind: 0*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTimeline, shiftForward, shiftBackward } from '../../redux/modules/timeline.actions';
import {default as ReactCalendarTimeline} from 'react-calendar-timeline';
import moment from 'moment';
// import moment from 'moment';
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
    shiftForward: PropTypes.func.isRequired,
    shiftBackward: PropTypes.func.isRequired,
    bookendsBeginning: PropTypes.object.isRequired,
    bookendsFinish: PropTypes.object.isRequired
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

    this.props.addTimeline(newEvent);
  };

  onNextWeek (e) {
    this.props.shiftForward();
  };

  onPreviousWeek (e) {
    this.props.shiftBackward();
  };

  onTimeChange (visibleTimeStart, visibleTimeEnd) {
    debugger;
    var minTime = moment().add(-6, 'months').valueOf();
    var maxTime = moment().add(6, 'months').valueOf();

    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      this.updateScrollCanvas(minTime, maxTime);
    } else if (visibleTimeStart < minTime) {
      this.updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart));
    } else if (visibleTimeEnd > maxTime) {
      this.updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime);
    } else {
      this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    }
  };

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

    console.log('view starts on ', this.props.timeline.bookendsBeginning.valueOf());
    console.log('view ends on ', this.props.timeline.bookendsFinish.valueOf());
    return (
      <div>
        <ReactCalendarTimeline
          groups={this.props.timeline.eventGroups}
          items={this.props.timeline.events}
          fixedHeader='fixed'
          keys={ourKeys}
          visibleTimeStart={this.props.timeline.bookendsBeginning.valueOf()}
          visibleTimeEnd={this.props.timeline.bookendsFinish.valueOf()}
          onTimeChange={this.onTimeChange}
        />

        <button onClick={(e) => this.onAddEvent(e)}>Drop 1 Dragon</button>
        <button onClick={(e) => this.onPreviousWeek(e)}>Last Week</button>
        <button onClick={(e) => this.onNextWeek(e)}>Next Week</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  bookendsBeginning: state.timeline.bookendsBeginning,
  bookendsFinish: state.timeline.bookendsFinish
});

export default connect((mapStateToProps), {
  addTimeline: (payload) => addTimeline(payload),
  shiftForward: () => shiftForward(),
  shiftBackward: () => shiftBackward()
})(TimelineContainer);
