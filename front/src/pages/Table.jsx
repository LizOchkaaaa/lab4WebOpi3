import React, {Component} from 'react';
import {connect} from "react-redux";
import "../screen/table.css";
class table extends Component{
    render() {
        return(
            <div className="container3">
                <table className="resultTable">
                    <thead>
                    <tr>
                        <th>x</th>
                        <th>y</th>
                        <th>r</th>
                        <th>Итог</th>
                        <th>Время скрипта</th>
                        <th>Текущее время</th>
                    </tr>
                    </thead>
                    <tbody className="table-body">
                      {this.props.app.table.map((point, index) => {
                          return (
                              <tr key={index}>
                                  <td>{point.x}</td>
                                  <td>{point.y}</td>
                                  <td>{point.r}</td>
                                  <td>{point.resultArea.toString()}</td>
                                  <td>{point.timeScript}</td>
                                  <td>{point.time}</td>
                              </tr>
                          );
                      })
                      }
                    </tbody>
                </table>
            </div>
        )
    }
}
const stateToProps = store => {
    return {
        app: store.app,
    }
};


export default connect(stateToProps)(table);