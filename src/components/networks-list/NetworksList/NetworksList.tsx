import NetworksListItem from './NetworksListItem';

const NetworksList = () => {
  return (
    <>
      <NetworksListItem
        id={'123'}
        name={'test'}
        company={['petete']}
        location={{ city: 'Madrid', country: 'Spain' }}
      />
      <NetworksListItem
        id={'123'}
        name={'test'}
        company={['petete']}
        location={{ city: 'Madrid', country: 'Spain' }}
      />
      <NetworksListItem
        id={'123'}
        name={'test'}
        company={['petete']}
        location={{ city: 'Madrid', country: 'Spain' }}
      />
    </>
  );
};

export default NetworksList;
