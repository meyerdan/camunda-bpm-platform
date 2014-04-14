
angular
.module('app')
.controller('DiagramCtrl', [
  '$scope', 
  '$rootScope',
  'DebugSession',
function(
  $scope, 
  $rootScope,
  DebugSession
) {

  (function(BpmnJS, $) {

    var container = $('#bpmn-js-drop-zone');

    var canvas = $('#bpmn-js-canvas');

    var renderer = new BpmnJS({ container: canvas, width: '100%', height: '100%' });

    var newDiagramXML ='<?xml version="1.0" encoding="UTF-8"?><bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="_9-MGsMkPEeOfvKNrfZLPzg" exporter="camunda modeler" exporterVersion="2.5.0" targetNamespace="http://activiti.org/bpmn">  <bpmn2:process id="orderProcess" name="Order Process" isExecutable="true">    <bpmn2:scriptTask id="ScriptTask_2" name="Handle large order" scriptFormat="Javascript">      <bpmn2:incoming>SequenceFlow_3</bpmn2:incoming>      <bpmn2:outgoing>SequenceFlow_5</bpmn2:outgoing><bpmn2:script></bpmn2:script>    </bpmn2:scriptTask>    <bpmn2:sequenceFlow id="SequenceFlow_5" name="" sourceRef="ScriptTask_2" targetRef="EndEvent_1"/>    <bpmn2:endEvent id="EndEvent_1">      <bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>    </bpmn2:endEvent>    <bpmn2:startEvent id="StartEvent_1">      <bpmn2:outgoing>SequenceFlow_1</bpmn2:outgoing>    </bpmn2:startEvent>    <bpmn2:sequenceFlow id="SequenceFlow_1" name="" sourceRef="StartEvent_1" targetRef="ScriptTask_4"/>    <bpmn2:scriptTask id="ScriptTask_4" name="load order" scriptFormat="Javascript">      <bpmn2:incoming>SequenceFlow_1</bpmn2:incoming>      <bpmn2:outgoing>SequenceFlow_7</bpmn2:outgoing>      <bpmn2:script><![CDATA[var items = [1, 3, 5, 10, 60, 20, 40];execution.setVariable("items", 200);]]></bpmn2:script>    </bpmn2:scriptTask>    <bpmn2:sequenceFlow id="SequenceFlow_7" name="" sourceRef="ScriptTask_4" targetRef="ScriptTask_1"/>    <bpmn2:scriptTask id="ScriptTask_1" name="calculate sum" scriptFormat="Javascript">      <bpmn2:incoming>SequenceFlow_7</bpmn2:incoming>      <bpmn2:outgoing>SequenceFlow_2</bpmn2:outgoing>      <bpmn2:script><![CDATA[execution.setVariable("sum", 200);]]></bpmn2:script>    </bpmn2:scriptTask>    <bpmn2:sequenceFlow id="SequenceFlow_2" name="" sourceRef="ScriptTask_1" targetRef="ExclusiveGateway_1"/>    <bpmn2:exclusiveGateway id="ExclusiveGateway_1" default="SequenceFlow_4">      <bpmn2:incoming>SequenceFlow_2</bpmn2:incoming>      <bpmn2:outgoing>SequenceFlow_3</bpmn2:outgoing>      <bpmn2:outgoing>SequenceFlow_4</bpmn2:outgoing>    </bpmn2:exclusiveGateway>    <bpmn2:sequenceFlow id="SequenceFlow_3" name="${sum > 100}" sourceRef="ExclusiveGateway_1" targetRef="ScriptTask_2">      <bpmn2:conditionExpression xsi:type="bpmn2:tFormalExpression">${sum > 100}</bpmn2:conditionExpression>    </bpmn2:sequenceFlow>    <bpmn2:sequenceFlow id="SequenceFlow_4" name="" sourceRef="ExclusiveGateway_1" targetRef="ScriptTask_3"/>    <bpmn2:endEvent id="EndEvent_2">      <bpmn2:incoming>SequenceFlow_6</bpmn2:incoming>    </bpmn2:endEvent>    <bpmn2:scriptTask id="ScriptTask_3" name="Handle small order" scriptFormat="Javascript">      <bpmn2:incoming>SequenceFlow_4</bpmn2:incoming>      <bpmn2:outgoing>SequenceFlow_6</bpmn2:outgoing><bpmn2:script></bpmn2:script>    </bpmn2:scriptTask>    <bpmn2:sequenceFlow id="SequenceFlow_6" name="" sourceRef="ScriptTask_3" targetRef="EndEvent_2"/>  </bpmn2:process>  <bpmndi:BPMNDiagram id="BPMNDiagram_1">    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="orderProcess">      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">        <dc:Bounds height="36.0" width="36.0" x="12.0" y="126.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="0.0" width="0.0" x="30.0" y="167.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="_BPMNShape_ScriptTask_2" bpmnElement="ScriptTask_1">        <dc:Bounds height="80.0" width="100.0" x="272.0" y="104.0"/>      </bpmndi:BPMNShape>      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_1" bpmnElement="SequenceFlow_1" sourceElement="_BPMNShape_StartEvent_2" targetElement="_BPMNShape_ScriptTask_5">        <di:waypoint xsi:type="dc:Point" x="48.0" y="144.0"/>        <di:waypoint xsi:type="dc:Point" x="120.0" y="144.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="6.0" width="6.0" x="62.0" y="144.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="_BPMNShape_ExclusiveGateway_2" bpmnElement="ExclusiveGateway_1" isMarkerVisible="true">        <dc:Bounds height="50.0" width="50.0" x="422.0" y="119.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="0.0" width="0.0" x="447.0" y="174.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_2" bpmnElement="SequenceFlow_2" sourceElement="_BPMNShape_ScriptTask_2" targetElement="_BPMNShape_ExclusiveGateway_2">        <di:waypoint xsi:type="dc:Point" x="372.0" y="144.0"/>        <di:waypoint xsi:type="dc:Point" x="422.0" y="144.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="6.0" width="6.0" x="430.0" y="77.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="_BPMNShape_ScriptTask_3" bpmnElement="ScriptTask_2">        <dc:Bounds height="80.0" width="100.0" x="552.0" y="17.0"/>      </bpmndi:BPMNShape>      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_3" bpmnElement="SequenceFlow_3" sourceElement="_BPMNShape_ExclusiveGateway_2" targetElement="_BPMNShape_ScriptTask_3">        <di:waypoint xsi:type="dc:Point" x="447.0" y="119.0"/>        <di:waypoint xsi:type="dc:Point" x="447.0" y="57.0"/>        <di:waypoint xsi:type="dc:Point" x="512.0" y="57.0"/>        <di:waypoint xsi:type="dc:Point" x="552.0" y="57.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="22.0" width="83.0" x="407.0" y="29.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="_BPMNShape_ScriptTask_4" bpmnElement="ScriptTask_3">        <dc:Bounds height="80.0" width="100.0" x="552.0" y="183.0"/>      </bpmndi:BPMNShape>      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_4" bpmnElement="SequenceFlow_4" sourceElement="_BPMNShape_ExclusiveGateway_2" targetElement="_BPMNShape_ScriptTask_4">        <di:waypoint xsi:type="dc:Point" x="447.0" y="169.0"/>        <di:waypoint xsi:type="dc:Point" x="447.0" y="223.0"/>        <di:waypoint xsi:type="dc:Point" x="512.0" y="223.0"/>        <di:waypoint xsi:type="dc:Point" x="552.0" y="223.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="6.0" width="6.0" x="348.0" y="212.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="_BPMNShape_EndEvent_2" bpmnElement="EndEvent_1">        <dc:Bounds height="36.0" width="36.0" x="702.0" y="39.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="0.0" width="0.0" x="720.0" y="80.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_5" bpmnElement="SequenceFlow_5" sourceElement="_BPMNShape_ScriptTask_3" targetElement="_BPMNShape_EndEvent_2">        <di:waypoint xsi:type="dc:Point" x="652.0" y="57.0"/>        <di:waypoint xsi:type="dc:Point" x="702.0" y="57.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="6.0" width="6.0" x="566.0" y="0.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="_BPMNShape_EndEvent_3" bpmnElement="EndEvent_2">        <dc:Bounds height="36.0" width="36.0" x="702.0" y="205.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="0.0" width="0.0" x="720.0" y="246.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_6" bpmnElement="SequenceFlow_6" sourceElement="_BPMNShape_ScriptTask_4" targetElement="_BPMNShape_EndEvent_3">        <di:waypoint xsi:type="dc:Point" x="652.0" y="223.0"/>        <di:waypoint xsi:type="dc:Point" x="702.0" y="223.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="6.0" width="6.0" x="710.0" y="156.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="_BPMNShape_ScriptTask_5" bpmnElement="ScriptTask_4">        <dc:Bounds height="80.0" width="100.0" x="120.0" y="104.0"/>      </bpmndi:BPMNShape>      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_7" bpmnElement="SequenceFlow_7" sourceElement="_BPMNShape_ScriptTask_5" targetElement="_BPMNShape_ScriptTask_2">        <di:waypoint xsi:type="dc:Point" x="220.0" y="144.0"/>        <di:waypoint xsi:type="dc:Point" x="272.0" y="144.0"/>        <bpmndi:BPMNLabel>          <dc:Bounds height="6.0" width="6.0" x="155.0" y="135.0"/>        </bpmndi:BPMNLabel>      </bpmndi:BPMNEdge>    </bpmndi:BPMNPlane>  </bpmndi:BPMNDiagram></bpmn2:definitions>';

/** register selection listener for elements */
    renderer.on('selection.changed', function(e) {
      var selectedElements = e.newSelection;

      var selectedIds = [];
      angular.forEach(selectedElements, function(el) {
        this.push(el.id);
      }, selectedIds);

      $rootScope.$broadcast('bpmn.element.selected', selectedIds);
    });

    function saveDiagram(done) {

      renderer.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
      });
    }

    function deployProcess() {
      
      saveDiagram(function(err, xml) {

        DebugSession.deployProcess({
          "resourceName": "process.bpmn",
          "resourceData": newDiagramXML
        });          

      });
    }

    function openDiagram(xml) {

      renderer.importXML(xml, function(err) {

        if (err) {
          container
            .removeClass('with-diagram')
            .addClass('with-error');

          container.find('.error pre').text(err.message);

          console.error(err);
        } else {
          container
            .removeClass('with-error')
            .addClass('with-diagram');

        }

      });
    }

    function saveSVG(done) {
      renderer.saveSVG(done);
    }


    ////// file drag / drop ///////////////////////

    // check file api availability
    if (!window.FileList || !window.FileReader) {
      window.alert(
        'Looks like you use an older browser that does not support drag and drop. ' +
        'Try using Chrome, Firefox or the Internet Explorer > 10.');
      return;
    }

    (function onFileDrop(container, callback) {

      function handleFileSelect(e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.dataTransfer.files;

        var file = files[0];

        var reader = new FileReader();

        reader.onload = function(e) {

          var xml = e.target.result;

          callback(xml);
        };

        reader.readAsText(file);
      }

      function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();

        e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
      }

      container.get(0).addEventListener('dragover', handleDragOver, false);
      container.get(0).addEventListener('drop', handleFileSelect, false);

    })(container, openDiagram);


    $(document).on('ready', function() {

      openDiagram(newDiagramXML);      

      $('#js-deploy-process').click(function(e) {
        e.stopPropagation();
        e.preventDefault();

        deployProcess();
      });


      var downloadLink = $('#js-download-diagram');
      var downloadSvgLink = $('#js-download-svg');

      $('.buttons a').click(function(e) {
        if (!$(this).is('.active')) {
          e.preventDefault();
          e.stopPropagation();
        }
      });

      function setEncoded(link, name, data) {
        var encodedData = encodeURIComponent(data);

        if (data) {
          link.addClass('active').attr({
            'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
            'download': name
          });
        } else {
          link.removeClass('active');
        }
      }

      var _ = require('lodash');

      var exportArtifacts = _.debounce(function() {

        saveSVG(function(err, svg) {
          setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg);
        });

        saveDiagram(function(err, xml) {
          setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml);
        });
      }, 500);

      renderer.on('commandStack.changed', exportArtifacts);
    });

  })(window.BpmnJS, require('jquery'));

}]);
