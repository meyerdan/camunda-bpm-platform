package org.camunda.bpm.container.impl.jobexecutor.ejb;

import javax.ejb.MessageDriven;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import org.camunda.bpm.engine.impl.cmd.ExecuteJobsCmd;
import org.camunda.bpm.engine.impl.interceptor.CommandExecutor;
import org.camunda.bpm.engine.impl.jobexecutor.tobemerged.ra.inflow.JobExecutionHandler;


/**
 * <p>MessageDrivenBean implementation of the {@link JobExecutionHandler} interface</p>
 * 
 * @author Daniel Meyer
 */
@MessageDriven(
  name="JobExecutionHandlerMDB",
  messageListenerInterface=JobExecutionHandler.class
)
@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
public class JobExecutionHandlerMDB implements JobExecutionHandler {

  public void executeJob(String job, CommandExecutor commandExecutor) {
    commandExecutor.execute(new ExecuteJobsCmd(job));
  }

}
