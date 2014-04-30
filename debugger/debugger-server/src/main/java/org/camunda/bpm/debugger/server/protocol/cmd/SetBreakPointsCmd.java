/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.camunda.bpm.debugger.server.protocol.cmd;

import java.util.ArrayList;
import java.util.List;

import org.camunda.bpm.debugger.server.protocol.dto.BreakPointDto;
import org.camunda.bpm.debugger.server.protocol.dto.SetBreakPointsData;
import org.camunda.bpm.engine.debugger.BreakPoint;
import org.camunda.bpm.engine.debugger.BreakPointSpecs;
import org.camunda.bpm.engine.debugger.DebugSession;

/**
 * @author Daniel Meyer
 *
 */
public class SetBreakPointsCmd extends DebugCommand<SetBreakPointsData> {

  public static String NAME = "set-breakpoints";

  public void execute(DebugCommandContext ctx) {

    DebugSession debugSession = ctx.getDebugSession();

    List<BreakPoint> breakPoints = new ArrayList<BreakPoint>();
    for (BreakPointDto dto : data.getBreakpoints()) {
      breakPoints.add(new BreakPoint(
          Enum.valueOf(BreakPointSpecs.class, dto.getType()),
          dto.getProcessDefinitionId(),
          dto.getElementId()));
    }

    debugSession.setBreakpoints(breakPoints);
  }

}
