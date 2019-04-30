import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
  withState,
  withHandlers,
} from 'recompose';
import { LayoutAnimation } from 'react-native';
import { inject } from 'mobx-react';
import R from 'ramda';

import ChatScreen from './ChatScreenView';
import { withParamsToProps } from '../../utils/enhancers';

export default hoistStatics(
  compose(
    withParamsToProps('transaction'),
    withParamsToProps('product'),
    inject((stores, { transaction }) => ({
      messageCollection: R.pathOr(
        [],
        ['messages', 'list', 'asArray'],
        transaction,
      ),
      transactionId: R.path(['id'], transaction),
      isLoading: R.path(
        ['messages', 'fetchMessages', 'inProgress'],
        transaction,
      ),
      transactionStore: stores.transaction,
      // fetchMore: R.pathOr(false, ['message'], transaction)
    })),
    withStateHandlers(
      {
        isShowDetails: false,
      },
      {
        setShowDetails: (props) => () => ({
          isShowDetails: !props.isShowDetails,
        }),
      },
    ),
    lifecycle({
      async componentDidMount() {
        try {
          if (this.props.product) {
            debugger;

            await this.props.transactionStore.fetchChatTransaction.run(
              this.props.product.id,
            );
          }
          // this.props.transaction[0].messages.initiateMessage.run();

          // if (this.props.transactionId.length === 0) {
          //   // if (this.props.transactionId.length === 0) {
          //   debugger;
          //   await this.props.transaction.initiateMessage.run(
          //     this.props.product.id,
          //   );
          // }
          // ///////
          // await this.props.transaction[
          //   this.props.transaction.length - 1
          // ].messages.fetchMessages.run();
          // ////
          this.props.transaction.messages.fetchMessages.run();
        } catch (err) {
          debugger;
          console.log(err);
        }
      },
    }),

    withState('messageInputText', 'setMessageInputText', ''),
    withHandlers({
      onSend: (props) => () => {
        const content = props.messageInputText.trim();

        LayoutAnimation.easeInEaseOut();
        props.transaction.messages.sendMessage.run(
          props.transactionId,
          content,
        );
        props.setMessageInputText('');

        // if (props.messageInputText.trim().length > 0) {
        //   try {
        //     props.transaction.sendMessage.run(
        //       props.transactionId,
        //       mess,
        //     );
        //     props.stores;
        //     // props.messages.sendMessage.run(
        //     //   props.product.transactionId,
        //     //   mess,
        //     // );
        //   } catch (err) {
        //     console.log(err);
        //   }
        // }
        // console.log('transactions_transactions', props.transactions);
      },

      fetchMoreMessages: (props) => () => {
        // const page = props.messageCollection.length
        props.transaction.messages.fetchMoreMessages.run();
      },
    }),
  ),
)(ChatScreen);
