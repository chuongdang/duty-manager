<?php

namespace Entity;

class Schedule extends Base
{
    /**
     *
     * @var integer
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     */
    public $id_schedule;

    /**
     *
     * @var string
     * @Column(type="string", length=128, nullable=true)
     */
    public $name;

    /**
     *
     * @var integer
     * @Column(type="integer", nullable=true)
     */
    public $shift_length;

    /**
     * Method to set the value of field id_schedule
     *
     * @param integer $id_schedule
     * @return $this
     */
    public function setIdSchedule($id_schedule)
    {
        $this->id_schedule = $id_schedule;

        return $this;
    }

    /**
     * Method to set the value of field name
     *
     * @param string $name
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Method to set the value of field shift_length
     *
     * @param integer $shift_length
     * @return $this
     */
    public function setShiftLength($shift_length)
    {
        $this->shift_length = $shift_length;

        return $this;
    }

    /**
     * Returns the value of field id_schedule
     *
     * @return integer
     */
    public function getIdSchedule()
    {
        return $this->id_schedule;
    }

    /**
     * Returns the value of field name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Returns the value of field shift_length
     *
     * @return integer
     */
    public function getShiftLength()
    {
        return $this->shift_length;
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'schedule';
    }

    public function initialize()
    {
        $this->hasManyToMany(
            'id_schedule',
            'Entity\ScheduleUser',
            'fk_schedule',
            'fk_user',
            'Entity\User',
            'id_user',
            [
                'alias' => 'userList'
            ]
        );
    }
}