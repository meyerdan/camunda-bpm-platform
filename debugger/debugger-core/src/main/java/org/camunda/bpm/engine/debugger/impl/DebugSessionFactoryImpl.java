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
package org.camunda.bpm.engine.debugger.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.debugger.BreakPoint;
import org.camunda.bpm.engine.debugger.DebugSession;
import org.camunda.bpm.engine.debugger.DebugSessionFactory;

/**
 * @author Daniel Meyer
 *
 */
public class DebugSessionFactoryImpl extends DebugSessionFactory {

  protected Logger LOGG = Logger.getLogger(DebugSessionFactoryImpl.class.getName());

  protected boolean isSuspend;

  protected DebugSessionImpl currentSession;

  protected List<SuspendedExecutionImpl> suspendedExecutionImpls = new ArrayList<SuspendedExecutionImpl>();

  protected ProcessEngine processEngine;

  public synchronized DebugSession openSession(BreakPoint... breakPoints) {
    if(currentSession != null) {
      throw new IllegalStateException("Cannot open session: Session already open.");

    }
    else {
      currentSession = new DebugSessionImpl(this, breakPoints);

      LOGG.info("[DEBUGGER] "+Thread.currentThread().getName()+" opens debug session.");

      // notify all suspended executions
      notifyAll();

      return currentSession;
    }
  }

  public void setSuspend(boolean suspend) {
    isSuspend = suspend;
  }

  public boolean isSuspend() {
    return isSuspend;
  }

  public DebugSessionImpl getCurrentSession() {
    return currentSession;
  }

  /**
   * Ads the {@link SuspendedExecutionImpl} to the list of suspended executions.
   *
   * This method will be invoked by the thread to be suspended.
   *
   * @param suspendedExecutionImpl
   */
  public synchronized void waitForOpenSession(SuspendedExecutionImpl suspendedExecutionImpl) {
    // re-check whether no session exists. This is synchronized with the
    // openSession method.
    if(currentSession == null) {
      suspendedExecutionImpls.add(suspendedExecutionImpl);
      try {
        LOGG.info("[DEBUGGER] "+ suspendedExecutionImpl.getSuspendedThread().getName() + " waiting for a debug session to be opened.");
        wait();
        LOGG.info("[DEBUGGER] "+ suspendedExecutionImpl.getSuspendedThread().getName() + " continuing execution.");

      } catch (InterruptedException e) {
        LOGG.info("[DEBUGGER] "+ suspendedExecutionImpl.getSuspendedThread().getName() + " interrupted while waiting for openSession().");

      } finally {
        suspendedExecutionImpls.remove(suspendedExecutionImpl);

      }
    }
  }

  public void setProcessEngine(ProcessEngine processEngine) {
    this.processEngine = processEngine;
  }

  public ProcessEngine getProcessEngine() {
    return processEngine;
  }

}
