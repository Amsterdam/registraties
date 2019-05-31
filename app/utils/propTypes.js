import PropTypes from 'prop-types';

export const dataPropType = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.string.isRequired,
    formattedKey: PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
      PropTypes.string,
    ]).isRequired,
    formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    key: PropTypes.string.isRequired,
    value: PropTypes.any,
  }),
);

const dataShape = {
  label: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  value: PropTypes.string.isRequired,
};

export const summaryPropType = PropTypes.shape({
  RSIN: PropTypes.shape(dataShape),
  accommodation_object_id: PropTypes.shape(dataShape),
  cadastral_object_nr: PropTypes.shape(dataShape),
  chamber_of_commerce_nr: PropTypes.shape(dataShape),
  house_id: PropTypes.shape(dataShape),
  number_indication_id: PropTypes.shape(dataShape),
});
