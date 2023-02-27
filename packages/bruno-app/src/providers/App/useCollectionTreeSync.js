import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  collectionAddDirectoryEvent,
  collectionAddFileEvent,
  collectionChangeFileEvent,
  collectionUnlinkFileEvent,
  collectionUnlinkDirectoryEvent,
  collectionUnlinkEnvFileEvent,
  requestSentEvent,
  requestQueuedEvent,
  testResultsEvent,
  assertionResultsEvent,
  scriptEnvironmentUpdateEvent,
  collectionRenamedEvent,
  runFolderEvent
} from 'providers/ReduxStore/slices/collections';
import toast from 'react-hot-toast';
import { openCollectionEvent, collectionAddEnvFileEvent } from 'providers/ReduxStore/slices/collections/actions';
import { isElectron } from 'utils/common/platform';

const useCollectionTreeSync = () => {
  if(process.env.NODE_ENV === 'development') {
    console.log(JSON.stringify({ function: 'useCollectionTreeSync' }));
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isElectron()) {
      return () => {};
    }

    const { ipcRenderer } = window;

    const _openCollection = (pathname, uid, name) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_openCollection', args: {pathname: pathname, uid: uid, name: name} }));
      }
      dispatch(openCollectionEvent(uid, pathname, name));
    };

    const _collectionTreeUpdated = (type, val) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_collectionTreeUpdated', args: {type: type, val: val} }));
      }
      if(window.__IS_DEV__) {
        console.log(type);
        console.log(val);
      }
      if (type === 'addDir') {
        dispatch(
          collectionAddDirectoryEvent({
            dir: val
          })
        );
      }
      if (type === 'addFile') {
        dispatch(
          collectionAddFileEvent({
            file: val
          })
        );
      }
      if (type === 'change') {
        dispatch(
          collectionChangeFileEvent({
            file: val
          })
        );
      }
      if (type === 'unlink') {
        setTimeout(() => {
          dispatch(
            collectionUnlinkFileEvent({
              file: val
            })
          );
        }, 100);
      }
      if (type === 'unlinkDir') {
        dispatch(
          collectionUnlinkDirectoryEvent({
            directory: val
          })
        );
      }
      if (type === 'addEnvironmentFile') {
        dispatch(collectionAddEnvFileEvent(val));
      }
      if (type === 'unlinkEnvironmentFile') {
        dispatch(collectionUnlinkEnvFileEvent(val));
      }
    };

    const _collectionAlreadyOpened = (pathname) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_collectionAlreadyOpened', args: {pathname: pathname} }));
      }
      toast.success('Collection is already opened');
    };

    const _displayError = (error) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_displayError', args: {error: error} }));
      }
      if(typeof error === "string") {
        return toast.error(error || 'Something went wrong!');
      }
      if(typeof message === "object") {
        return toast.error(error.message || 'Something went wrong!');
      }
    };

    const _httpRequestSent = (val) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_httpRequestSent', args: {val: val} }));
      }
      dispatch(requestSentEvent(val));
    };

    const _scriptEnvironmentUpdate = (val) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_scriptEnvironmentUpdate', args: {val: val} }));
      }
      dispatch(scriptEnvironmentUpdateEvent(val));
    };

    const _httpRequestQueued = (val) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_httpRequestQueued', args: {val: val} }));
      }
      dispatch(requestQueuedEvent(val));
    };

    const _testResults = (val) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_testResults', args: {val: val} }));
      }
      dispatch(testResultsEvent(val));
    };

    const _assertionResults = (val) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_assertionResults', args: {val: val} }));
      }
      dispatch(assertionResultsEvent(val));
    };

    const _collectionRenamed = (val) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_collectionRenamed', args: {val: val} }));
      }
      dispatch(collectionRenamedEvent(val));
    };

    const _runFolderEvent = (val) => {
      if(process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify({ function: '_runFolderEvent', args: { val: val } }));
      }
      dispatch(runFolderEvent(val));
    };

    ipcRenderer.invoke('renderer:ready');

    const removeListener1 = ipcRenderer.on('main:collection-opened', _openCollection);
    const removeListener2 = ipcRenderer.on('main:collection-tree-updated', _collectionTreeUpdated);
    const removeListener3 = ipcRenderer.on('main:collection-already-opened', _collectionAlreadyOpened);
    const removeListener4 = ipcRenderer.on('main:display-error', _displayError);
    const removeListener5 = ipcRenderer.on('main:http-request-sent', _httpRequestSent);
    const removeListener6 = ipcRenderer.on('main:script-environment-update', _scriptEnvironmentUpdate);
    const removeListener7 = ipcRenderer.on('main:http-request-queued', _httpRequestQueued);
    const removeListener8 = ipcRenderer.on('main:test-results', _testResults);
    const removeListener9 = ipcRenderer.on('main:assertion-results', _assertionResults);
    const removeListener10 = ipcRenderer.on('main:collection-renamed', _collectionRenamed);
    const removeListener11 = ipcRenderer.on('main:run-folder-event', _runFolderEvent);

    return () => {
      removeListener1();
      removeListener2();
      removeListener3();
      removeListener4();
      removeListener5();
      removeListener6();
      removeListener7();
      removeListener8();
      removeListener9();
      removeListener10();
      removeListener11();
    };
  }, [isElectron]);
};

export default useCollectionTreeSync;
