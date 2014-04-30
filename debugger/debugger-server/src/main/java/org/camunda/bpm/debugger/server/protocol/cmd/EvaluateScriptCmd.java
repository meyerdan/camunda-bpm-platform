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

import org.camunda.bpm.debugger.server.protocol.dto.EvaluateScriptData;
import org.camunda.bpm.engine.debugger.DebugSession;

/**
 * @author Daniel Meyer
 *
 */
public class EvaluateScriptCmd extends DebugCommand<EvaluateScriptData> {

  public final static String NAME = "evaluate-script";

  public void execute(DebugCommandContext ctx) {
    DebugSession debugSession = ctx.getDebugSession();

    debugSession.evaluateScript(data.getExecutionId(), data.getLanguage(), data.getScript(), data.getCmdId());
  }

}
