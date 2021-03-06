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

package org.camunda.bpm.engine.test.api.nonpublic;

import java.util.List;

import org.camunda.bpm.engine.impl.EventSubscriptionQueryImpl;
import org.camunda.bpm.engine.impl.interceptor.Command;
import org.camunda.bpm.engine.impl.interceptor.CommandContext;
import org.camunda.bpm.engine.impl.persistence.entity.EventSubscriptionEntity;
import org.camunda.bpm.engine.impl.persistence.entity.MessageEventSubscriptionEntity;
import org.camunda.bpm.engine.impl.persistence.entity.SignalEventSubscriptionEntity;
import org.camunda.bpm.engine.impl.test.PluggableProcessEngineTestCase;
import org.camunda.bpm.engine.runtime.Execution;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.test.Deployment;


/**
 * @author Daniel Meyer
 */
public class EventSubscriptionQueryTest extends PluggableProcessEngineTestCase {
  
  public void testQueryByEventName() {
    
    processEngineConfiguration.getCommandExecutorTxRequired()
      .execute(new Command<Void>() {
        public Void execute(CommandContext commandContext) {
          
          MessageEventSubscriptionEntity messageEventSubscriptionEntity1 = new MessageEventSubscriptionEntity();
          messageEventSubscriptionEntity1.setEventName("messageName");
          messageEventSubscriptionEntity1.insert();
          
          MessageEventSubscriptionEntity messageEventSubscriptionEntity2 = new MessageEventSubscriptionEntity();
          messageEventSubscriptionEntity2.setEventName("messageName");
          messageEventSubscriptionEntity2.insert();
          
          MessageEventSubscriptionEntity messageEventSubscriptionEntity3 = new MessageEventSubscriptionEntity();
          messageEventSubscriptionEntity3.setEventName("messageName2");
          messageEventSubscriptionEntity3.insert();
          
          return null;
        }
      });
    
    List<EventSubscriptionEntity> list = newEventSubscriptionQuery()
      .eventName("messageName")
      .list();
    assertEquals(2, list.size());
    
    list = newEventSubscriptionQuery()
      .eventName("messageName2")
      .list();
    assertEquals(1, list.size());
    
    cleanDb();
    
  }
  
  public void testQueryByEventType() {
    
    processEngineConfiguration.getCommandExecutorTxRequired()
      .execute(new Command<Void>() {
        public Void execute(CommandContext commandContext) {
          
          MessageEventSubscriptionEntity messageEventSubscriptionEntity1 = new MessageEventSubscriptionEntity();
          messageEventSubscriptionEntity1.setEventName("messageName");          
          messageEventSubscriptionEntity1.insert();
          
          MessageEventSubscriptionEntity messageEventSubscriptionEntity2 = new MessageEventSubscriptionEntity();
          messageEventSubscriptionEntity2.setEventName("messageName");
          messageEventSubscriptionEntity2.insert();
          
          SignalEventSubscriptionEntity signalEventSubscriptionEntity3 = new SignalEventSubscriptionEntity();
          signalEventSubscriptionEntity3.setEventName("messageName2");
          signalEventSubscriptionEntity3.insert();
          
          return null;
        }
      });
    
    List<EventSubscriptionEntity> list = newEventSubscriptionQuery()
      .eventType("signal")
      .list();
    assertEquals(1, list.size());
    
    list = newEventSubscriptionQuery()
      .eventType("message")
      .list();
    assertEquals(2, list.size());
    
    cleanDb();
    
  }
  
  public void testQueryByActivityId() {
    
    processEngineConfiguration.getCommandExecutorTxRequired()
      .execute(new Command<Void>() {
        public Void execute(CommandContext commandContext) {
          
          MessageEventSubscriptionEntity messageEventSubscriptionEntity1 = new MessageEventSubscriptionEntity();
          messageEventSubscriptionEntity1.setEventName("messageName");        
          messageEventSubscriptionEntity1.setActivityId("someActivity");          
          messageEventSubscriptionEntity1.insert();
          
          MessageEventSubscriptionEntity messageEventSubscriptionEntity2 = new MessageEventSubscriptionEntity();
          messageEventSubscriptionEntity2.setEventName("messageName");
          messageEventSubscriptionEntity2.setActivityId("someActivity");
          messageEventSubscriptionEntity2.insert();
          
          SignalEventSubscriptionEntity signalEventSubscriptionEntity3 = new SignalEventSubscriptionEntity();
          signalEventSubscriptionEntity3.setEventName("messageName2");
          signalEventSubscriptionEntity3.setActivityId("someOtherActivity");
          signalEventSubscriptionEntity3.insert();
          
          return null;
        }
      });
    
    List<EventSubscriptionEntity> list = newEventSubscriptionQuery()
      .activityId("someOtherActivity")
      .list();
    assertEquals(1, list.size());
    
    list = newEventSubscriptionQuery()
      .activityId("someActivity")
      .eventType("message")
      .list();
    assertEquals(2, list.size());
    
    cleanDb();
    
  }
  
  @Deployment
  public void testQueryByExecutionId() {
    
    // starting two instances:
    ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("catchSignal");
    runtimeService.startProcessInstanceByKey("catchSignal");
    
    // test query by process instance id
    EventSubscriptionEntity subscription = newEventSubscriptionQuery()
      .processInstanceId(processInstance.getId())
      .singleResult();
    assertNotNull(subscription);
    
    Execution executionWaitingForSignal = runtimeService.createExecutionQuery()
      .activityId("signalEvent")
      .processInstanceId(processInstance.getId())
      .singleResult();
    
    // test query by execution id
    EventSubscriptionEntity signalSubscription = newEventSubscriptionQuery()
      .executionId(executionWaitingForSignal.getId())
      .singleResult();
    assertNotNull(signalSubscription);
    
    assertEquals(signalSubscription, subscription);
    
    cleanDb();
    
  }

  protected EventSubscriptionQueryImpl newEventSubscriptionQuery() {
    return new EventSubscriptionQueryImpl(processEngineConfiguration.getCommandExecutorTxRequired());
  }

  protected void cleanDb() {    
    processEngineConfiguration.getCommandExecutorTxRequired()
    .execute(new Command<Void>() {
      public Void execute(CommandContext commandContext) {
        final List<EventSubscriptionEntity> subscriptions = new EventSubscriptionQueryImpl(commandContext).list();
        for (EventSubscriptionEntity eventSubscriptionEntity : subscriptions) {
          eventSubscriptionEntity.delete();
        }
        return null;
      }
    });
    
  }

}
